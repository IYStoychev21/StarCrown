
export type UserType = {
    name: string
    first: string
    last: string
    pic: string
    email: string
};

export type GameType = {
    appid: number
    name: string
};

export type GameSaveType = {
    gameId: number,
    gameName: string,
    path: string
};