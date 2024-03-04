from fastapi import FastAPI, BackgroundTasks
import requests
import time
import asyncio

app = FastAPI()



def call_self():
    try:
        response = requests.get("https://repeatserver.onrender.com/temp")  # Assuming your server is running on localhost and port 8000
        response1 = requests.get("https://repeatserver.onrender.com/")  # Assuming your server is running on localhost and port 8000
        # Do something with the response if needed
        print("Called / endpoint:", response.text, response1.text)
    except Exception as e:
        print(f"Error occurred while making GET request to self: {e}")

# Call the "/" endpoint of the server as soon as it's up and running
call_self()




# Function to make GET request to another API URL
async def call_external_api():
    try:
        response = requests.get("https://musicaddict.onrender.com/")
        # response = requests.get("http://127.0.0.1:8000/")
        # Do something with the response if needed
        print("repeat server" + response.text)
    except Exception as e:
        print(f"Error occurred while making GET request: {e}")

# Function to initiate the background task
async def start_background_task():
    while True:
        await call_external_api() 
        # Sleep for 10 minutes
        await asyncio.sleep(551)   # 10 minutes = 600 seconds

# Endpoint to test if the server is running
@app.get("/")
async def read_root():
    asyncio.create_task(start_background_task()) 
    return {"extension" : "repeatServer"}

@app.get("/temp")
async def read_temp():
    return {"extension" : "repeatServer"}



# git add .; git commit -m "repeat-tempServer"; git push origin 