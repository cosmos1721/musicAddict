
from models import *
from models import spotifyPlaylist

app = FastAPI()


async def main():
    asyncio.create_task(upd_token())
app.add_event_handler("startup", main)



@app.get("/")
async def read_root():
    return {"extension" : "musicAddict"} 


 
    # search for param to be given by front end logic search only for gen
    # will check in frontend if the search is a word or it contains a url, if url, push to playlist(), else, push to search()
    #logic will be like that frontend will only call api if threres anything in it 
    
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
    if type == 'yt':
        playlist_name, playlist_image, tracks = await ytPlaylist(id)
    if type == 'sp':
        playlist_name, playlist_image, tracks = await spotifyPlaylist(id)

    global playlist_info
    playlist_info = {
        'playlist_name': playlist_name,
        'playlist_image': playlist_image, # keep that image in frontend for display and later add
        'tracks': tracks
    }
    return playlist_info

@app.get('/play')
async def playlistSegment():
    tracks = []
    for item in playlist_info['tracks']:
        response = await genSearchQuery(item["name"])
        tracks.append(response[0])
        print(tracks)
    return tracks


