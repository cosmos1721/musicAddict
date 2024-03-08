
from bson import ObjectId
from models import *
from models import spotifyPlaylist
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


async def main():
    asyncio.create_task(upd_token())
app.add_event_handler("startup", main)



@app.get("/")
async def read_root():
    return {"extension" : "musicAddict"} 

@app.post('/login')
async def retrieve(email,password) :
    collection = db["creds"]
    
    user_details = collection.find_one({"email":email,"password":password})
    if user_details:
        mongoId=  str(user_details.get('_id'))
        return mongoId    
    else: 
        return False
    
@app.post('/signup')
async def add_data(email: str, password: str) -> str:
    collection = db["creds"]
    
    existing_user = collection.find_one({"email": email})
    
    if existing_user:
        return None
    else:
        user_data = {
            "email": email,
            "password": password,
        }
        result = collection.insert_one(user_data)
        mongoId= str(result.inserted_id)
        await edit_data(emptyData, "add", mongoId)
        return mongoId
    
@app.post('/editData')
async def edit_data(infoData, changeState, mongoId: str) -> str:
    collection = db["info"]
    if changeState == "add":
        result = collection.insert_one(infoData)
    elif changeState == "edit":
        result = collection.update_one({"_id": ObjectId(mongoId)}, {"$set": infoData})
    return result


@app.get('/query')
async def  genSearchQuery(q: str):
    url = os.getenv("MUSIC_API") + f"search?q={q}&searchEngine=seevn"
    response = requests.get(url)
    search = response.json()['response']
    #click on forntend and then play directly 
    return search 

@app.get('/playlist')
async def playlist(id: str):
    type = 'sp'
    if type == 'sp':
        playlist_name, playlist_image, tracks = await spotifyPlaylist(id)
    # elif type == 'yt':
    #     playlist_name, playlist_image, tracks = await ytPlaylist(id)

    global playlist_info
    playlist_info = {
        'info': {
            'id': id,
            'playlist_name': playlist_name,
            'playlist_image': playlist_image # keep that image in frontend for display and later add
        },
        'tracks': tracks
    }
    return playlist_info

@app.get('/play')
async def playlistSegment():
    #create a mongo id for the playlist stored in the db
    tracks = []
    tracks.append(playlist_info['info']['id'])
    for item in playlist_info['tracks']:
        response = await genSearchQuery(item["name"])
        tracks.append(response[0])
        print(tracks)
    return tracks


