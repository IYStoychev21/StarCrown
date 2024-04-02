from fastapi import FastAPI, Request
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from fastapi.middleware.cors import CORSMiddleware
from googleapiclient.http import MediaFileUpload

import json
import os

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://tauri.localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

def folder_exists(service, folder_name, parent_folder_id=None):
    if parent_folder_id:
        query = f"mimeType='application/vnd.google-apps.folder' and name='{folder_name}' and '{parent_folder_id}' in parents and trashed=false"
    else:
        query = f"mimeType='application/vnd.google-apps.folder' and name='{folder_name}' and trashed=false"
    
    response = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    files = response.get('files', [])
    
    if files:
        return True

    return False


@app.get("/init/config")
def init(request: Request):
    token = request.headers["Authorization"]
    creds = Credentials(token)

    service = build('drive', 'v3', credentials=creds)
    starCrownId = 0

    if not folder_exists(service, "StarCrown"):
        file_metadata = {
            "name": "StarCrown",
            "mimeType": "application/vnd.google-apps.folder",
        }

        file = service.files().create(body=file_metadata, fields="id").execute()

        starCrownId = file.get("id")

    if not folder_exists(service, "Games", starCrownId):
        file_metadata = {
            "name": "Games",
            "mimeType": "application/vnd.google-apps.folder",
            "parents": [starCrownId]
        }

        file = service.files().create(body=file_metadata, fields="id").execute()

        return "Config initialized"

    
    return "Folder already exists"

@app.post("/sync/to")
async def syncTo(request: Request):
    token = request.headers["Authorization"]
    body = await request.json()

    creds = Credentials(token)

    service = build('drive', 'v3', credentials=creds)

    query = "mimeType='application/vnd.google-apps.folder' and name='StarCrown' and trashed=false"
    files = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute().get('files', [])
    parant_folder_id = files[0].get('id')

    query = "mimeType='application/vnd.google-apps.folder' and name='Games' and trashed=false"
    game_foler_files = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute().get('files', [])
    games_folder_id = game_foler_files[0].get('id')

    with open(body["filePath"], "r") as f:
        data = json.load(f)

    for game in data:
        query = "name='" + game['path'].split('\\')[-1] + f"' and '{games_folder_id}' in parents and trashed=false"
        files = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute().get('files', [])

        if not files:
            file_metadata = {
                "name": game['path'].split('\\')[-1],
                "mimeType": "application/vnd.google-apps.folder",
                "parents": [games_folder_id]
            }

            file = service.files().create(body=file_metadata, fields="id").execute()

            game_folder_id = file.get("id") 

            game_file = []

            for file in os.walk(game['path']):
                for f in file[2]:
                    game_file.append(f)

            for f in game_file:
                file_metadata = {
                    "name": f,
                    "parents": [game_folder_id]
                }

                media = MediaFileUpload(game['path'] + "\\" + f, mimetype="application/octet-stream", resumable=True)

                file = (
                    service.files()
                    .create(body=file_metadata, media_body=media, fields="id")
                    .execute()
                )
        else:
            game_folder_id = files[0].get('id')

            game_file = []

            for file in os.walk(game['path']):
                for f in file[2]:
                    query = f"name='{f}' and '{game_folder_id}' in parents and trashed=false"
                    files = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute().get('files', [])

                    if not files:
                        game_file.append(f)

            for f in game_file:
                file_metadata = {
                    "name": f,
                    "parents": [game_folder_id]
                }

                media = MediaFileUpload(game['path'] + "\\" + f, mimetype="application/octet-stream", resumable=True)

                file = (
                    service.files()
                    .create(body=file_metadata, media_body=media, fields="id")
                    .execute()
                )

    query = f"name='library.json' and '{parant_folder_id}' in parents and trashed=false"
    files = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute().get('files', [])

    if files:
        file = files[0]
        file_id = file.get('id')

        media = MediaFileUpload(body["filePath"], mimetype="application/json", resumable=True)

        file = (
            service.files()
            .update(fileId=file_id, media_body=media)
            .execute()
        )

        return {"details": "Synced to StarCrown", "folder_id": file.get("id")}
    
    config_file_metadata = {
        "name": "library.json",
        "mimeType": "application/json",
        "parents": [parant_folder_id]
    }

    media = MediaFileUpload(body["filePath"], mimetype="application/json", resumable=True)

    file = (
        service.files()
        .create(body=config_file_metadata, media_body=media, fields="id")
        .execute()
    )

    return {"details": "Synced to StarCrown", "folder_id": file.get("id")}