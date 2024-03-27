from typing import Union

from fastapi import FastAPI, Request
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from fastapi.middleware.cors import CORSMiddleware

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


