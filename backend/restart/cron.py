import requests

response = requests.get("https://musicaddict.onrender.com/")
        # response = requests.get("http://127.0.0.1:8000/")
        # Do something with the response if needed
print("repeat server" + response.text)

# git add .; git commit -m "repeat-tempServer"; git push origin 