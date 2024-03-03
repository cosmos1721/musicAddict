def extract_playlist_id(url):
    # Find the index of 'playlist/'
    playlist_index = url.find('playlist/')

    # Extract the playlist ID
    if playlist_index != -1:
        playlist_id_start = playlist_index + len('playlist/')
        playlist_id_end = url.find('?', playlist_index)  # Find the index of '?' after 'playlist/'
        if playlist_id_end == -1:
            playlist_id_end = len(url)
        playlist_id = url[playlist_id_start:playlist_id_end]
        return playlist_id
    else:
        return None

# Example usage
url1 = "https://open.spotify.com/playlist/1aeq5vkhbA1FJHvYzCjK5J?si=ppnztkCZQZSXbP7bPCTrMw&utm_source=whatsapp"
url2 = "https://open.spotify.com/playlist/1aeq5vkhbA1FJHvYzCjK5J"

playlist_id1 = extract_playlist_id(url1)
playlist_id2 = extract_playlist_id(url2)

print("Playlist ID 1:", playlist_id1)
print("Playlist ID 2:", playlist_id2)
