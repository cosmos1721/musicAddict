from fastapi import FastAPI
from dotenv import load_dotenv
from pymongo import MongoClient
import os
import base64
import requests
import asyncio

load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
client = MongoClient(os.getenv("MONGO_URL"))
db = client[os.getenv("MONGO_DB")]



async def auth():
    auth_str= client_id + ":" + client_secret
    auth_bytes= auth_str.encode('utf-8')
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")
    
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "client_credentials"
    }
    
    try:
        response = requests.post(url, headers=headers, data=data)
        
        if response.status_code == 200:
            access_token= response.json()["access_token"] 
            return access_token
        else:
            return response.status_code
    except Exception as e:
        return e

async def upd_token():
    global headers
    token= await auth()
    while True:
        headers= {"Authorization": "Bearer " + token}
        await asyncio.sleep(3500)
        token= await auth()


async def spotifyPlaylist(id : str):
    url = f"https://api.spotify.com/v1/playlists/{id}/"
    response = requests.get(url, headers=headers)
    
    playlist_name = response.json()['name']
    playlist_image = response.json()['images'][0]['url']
    tracksInfo = []
    for item in response.json()['tracks']['items']:
        track_info = {
            'name': item['track']['name']}
        tracksInfo.append(track_info)
    return playlist_name, playlist_image, tracksInfo

async def  genQuery(q: str):
    url = os.getenv("MUSIC_API") + f"search?q={q}&searchEngine=wunk"
    response = requests.get(url)
    search = response.json()['response']
    return search 


async def ytPlaylist(id : str):
    
    pass

async def edit_data(infoData, changeState: str, mongoId: str) -> dict:
    collection = db["info"]
    resultId = collection.find_one({"myId": mongoId})
    print(resultId)
    if changeState == "add":
        result = collection.insert_one(infoData)
    elif changeState == "show":
        result= {
            "myId": resultId["myId"],
            "savedSongs": resultId["savedSongs"],
            "playlistData": resultId["playlistData"]
        }
    return result



# https://github.com/mohd-baquir-qureshi/music-api

