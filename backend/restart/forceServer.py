from fastapi import FastAPI, BackgroundTasks
import requests
import time
import asyncio

app = FastAPI()

# Function to make GET request to another API URL
async def call_external_api():
    try:
        response = requests.get("https://musicaddict.onrender.com/")
        # Do something with the response if needed
        print("repeat server is running." + response.text)
    except Exception as e:
        print(f"Error occurred while making GET request: {e}")

# Function to initiate the background task
async def start_background_task():
    while True:
        await call_external_api()
        # Sleep for 10 minutes
        await asyncio.sleep(500)   # 10 minutes = 600 seconds

# Register event handler to start the background task when the app starts
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(start_background_task())

# Endpoint to test if the server is running
@app.get("/")
async def read_root():
    return {"message": "repeat server is running."}
