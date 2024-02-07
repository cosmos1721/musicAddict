from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["music_player"]

# Define your API routes here
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI with MongoDB!"}

