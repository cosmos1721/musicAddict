function activateTab(evt, tabName) {
  var i, tabcontent, tablinks, indicator;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  // Move indicator
  indicator = document.getElementById("indicator");
  const activeTab = evt.currentTarget;
  indicator.style.width = activeTab.offsetWidth + "px";
  indicator.style.left = activeTab.offsetLeft + "px";
}

url = "https://musicaddict.onrender.com/"

musicQueue1 = [
  { title: "Song 2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkrFlvX7gzW284Kw2lz6_MJ0ZOq8pEOfq8ixfKP5ADOw&s", id:"205659dc7589f400defc73f6918b369759cd3b88cfaef01c5af3c98af7e10d683d55756d7191f1217deea14ee68a618ca8aba082073c68e1b8bef0b3aa416375"},
  { title: "Song 3", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388", id: "b64b134e4b8f37452cf94577dbaae5db9a50c7a57933f15813797c13dca4dc563ffc3bfd8019f1c3403e913d5005bd7ea95c012fe1945b02ecb136a3afbc943bd6ac88887c821ecca3db1b4519ac2de9", duration : 100},
  { title: "Song 4", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388", id: "https://www.pagalworld.com.cm/siteuploads/files/sfd134/66697/%20Ram%20Siya%20Ram(PagalWorld.com.cm).mp3", duration : 100},
  { title: "Song 5", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388", id: "https://www.pagalworld.com.cm/siteuploads/files/sfd134/66697/%20Ram%20Siya%20Ram(PagalWorld.com.cm).mp3", duration : 100},
  { title: "Song 7", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388", id: "https://www.pagalworld.com.cm/siteuploads/files/sfd134/66697/%20Ram%20Siya%20Ram(PagalWorld.com.cm).mp3", duration : 100}
];

savedSongs = []
playlistData1 = [
  {id: 1, title: "playlist 1", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388"},
  {id: 4, title: "playlist 4", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388"},
  {id: 5, title: "playlist 5", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388"}
];

let playlistData = [...playlistData1];
let musicQueue = [... musicQueue1];

let audio = new Audio();
currentSongIndex = 0; 

function highlightCurrentSong() {
// Remove the 'active-song' class from all song components
const allSongs = document.querySelectorAll('.song-component');

allSongs.forEach((comp, index) => {
  comp.classList.add('active-song');
  
  if (index != currentSongIndex) {
    comp.classList.remove('active-song');
  }
  
});
}



function createSongComponent(song, index, sp= false, isLocalItem= false, isPlaylistItem = false) {
  const songComponent = document.createElement('div');
  songComponent.classList.add('song-component');
  songComponent.dataset.index = index;

  // Album Art
  const albumArt = document.createElement('img');
  albumArt.src = song.img;
  albumArt.alt = 'Album Art';
  albumArt.classList.add('song-image');
  songComponent.appendChild(albumArt);

  // Song title
  const songTitle = document.createElement('span');
  songTitle.textContent = song.title;
  songTitle.classList.add('song-title');
  if (!isLocalItem) songTitle.style.fontSize = '15px'; 
  
  songComponent.appendChild(songTitle);

  if(isLocalItem){
    // console.log("temp1", index, eisPlaylistItem);
  const deleteButton = document.createElement('img');
  deleteButton.src = '/front-end/icons/bin.png';
  deleteButton.alt = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() { 
      deleteSong(index, isPlaylistItem); };
    songComponent.appendChild(deleteButton);
    
    if (isPlaylistItem) {
      // Adjust click behavior based on whether it's a playlist item
      //for next page
    }
    
    songComponent.addEventListener('click', (e) => {
      if (e.target !== deleteButton) {
        currentSongIndex = index;
        
        if (!isPlaylistItem)  playSelectedSong();
        highlightCurrentSong();
      }
    });
  }
  else{
    const addToQueueButton = document.createElement('img');
    addToQueueButton.src = '/front-end/icons/play.png';
    addToQueueButton.alt = 'Add to Queue';
    addToQueueButton.classList.add('delete-button');
    addToQueueButton.onclick = function() { 
      if(!sp){
        console.log("temp", song);
      musicQueue.push(song);
      displayQueue();
    }
    else{
      playlistData.push(song);
      displayPlaylist();
      console.log(playlistData);
    }
    };
    songComponent.appendChild(addToQueueButton);
  }
  return songComponent;
}






function displayPlaylist() {
  const playlistElement = document.getElementById('Playlist');
  playlistElement.innerHTML = ''; // Clear existing content

  // Your Selection component (always on top without a delete button)
  const yourSelectionComponent = document.createElement('div');
  yourSelectionComponent.textContent = 'Your Selections'; // Add more styling and structure as needed
  yourSelectionComponent.classList.add('song-component', 'song-title');
  playlistElement.appendChild(yourSelectionComponent);
  
  // Dynamically generate playlist components
  playlistData.forEach((playlist, index) => {
    // Assuming playlist object structure { playlist_name: "...", playlist_image: "..." }
    const playlistComponent = createSongComponent({
      title: playlist.title,
      img: playlist.img
    }, index, true); 
    playlistElement.appendChild(playlistComponent);
  });
}

function displayQueue() {
  const queueElement = document.getElementById('Queue');
  queueElement.innerHTML = ''; // Clear existing content
  const list = document.createElement('div'); // Use a div to hold song components
  musicQueue.forEach((song, index) => {
    const songComponent = createSongComponent(song, index, false, true, false); // Pass index here
    list.appendChild(songComponent); // Append the song component to the list
  });
  queueElement.appendChild(list); // Append the list to the Queue section
  
}




// Function to play the selected song
function playSelectedSong() {
  currentSong = musicQueue[currentSongIndex];
  updatePlayer();
}




// Delete function to handle song deletion
function deleteSong(index, isPlaylistItem ) {
  const songComponent = document.querySelector(`.song-component[data-index="${index}"]`);
  if (songComponent) {
    // Slide-up transition
    songComponent.style.transition = 'all 0.2s ease';
    songComponent.style.opacity = '0';
    songComponent.addEventListener('transitionend', function() {
      if (isPlaylistItem) {
        songComponent.remove(); // Remove the component after transition
        playlistData.splice(index, 1); // Remove the song from the playlist
        displayPlaylist(); // Refresh the playlist to remove the deleted song
      }
      else {
        songComponent.remove(); // Remove the component after transition
        musicQueue.splice(index, 1); // Remove the song from the music queue
        displayQueue(); // Refresh the display to update indexes and the queue
      }});
    }
    console.log("temp1", index, isPlaylistItem);
}



function initMusicQueue() {
currentSong = musicQueue[currentSongIndex]; // Set the current song to the first song
updatePlayer();
updateProgressBar();
displayQueue();
displayPlaylist();
}


songUrl= 'https://musicapi.x007.workers.dev/fetch?id='

function updatePlayer() {
if (!currentSong) return; 
const mainPlayer = document.getElementById('body');
document.getElementById('albumArt').src = currentSong.img;
document.getElementById('songTitle').textContent = currentSong.title;
audio.src = songUrl+currentSong.id;
let blurredBackground = document.querySelector('.blurred-background');
if (!blurredBackground) {
  blurredBackground = document.createElement('div');
  blurredBackground.classList.add('blurred-background');
  mainPlayer.insertBefore(blurredBackground, mainPlayer.firstChild); // Insert as the first child
}
blurredBackground.style.backgroundImage = `url('${currentSong.img}')`;
audio.addEventListener('loadedmetadata', function() {
  document.getElementById('totalTime').textContent = formatTime(Math.round(audio.duration));
});
audio.addEventListener('ended', nextSong);

audio.play().then(() => {
  document.getElementById('playPauseIcon').src = '/front-end/icons/pause.png';
}).catch(error => console.error("Playback failed", error));

updateProgressBar();
highlightCurrentSong();

}

// Function to format time from seconds to M:SS
function formatTime(seconds) {
let min = Math.floor(seconds / 60);
let sec = seconds % 60;
return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

let progressInterval;

function updateProgressBar() {

const progressBar = document.querySelector(".slider .progress");
audio.ontimeupdate = () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percentage}%`;
  document.getElementById('currentTime').textContent = formatTime(Math.round(audio.currentTime));
  document.getElementById('totalTime').textContent = formatTime(Math.round(audio.duration));
};

const slider = document.querySelector(".slider");
slider.addEventListener("click", function(e) {
  const sliderWidth = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / sliderWidth) * duration;
});
}



function previousSong() {
clearInterval(progressInterval);
currentSongIndex = currentSongIndex > 0 ? currentSongIndex - 1 : musicQueue.length - 1;
currentSong = musicQueue[currentSongIndex];
updatePlayer();
}

// Function to play the next song
function nextSong() {
clearInterval(progressInterval);
currentSongIndex = (currentSongIndex + 1) % musicQueue.length;
currentSong = musicQueue[currentSongIndex];
updatePlayer();
}

let isShuffleActive = false;

function shuffleSongs() {
if (!isShuffleActive) {
  originalQueue = [...musicQueue]; // Store the current queue as the original queue
  // confirm("Shuffle is active");
  for (let i = musicQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [musicQueue[i], musicQueue[j]] = [musicQueue[j], musicQueue[i]];
  }
  isShuffleActive = true;
  document.getElementById('shuffleButtonIcon').src = '/front-end/icons/shuffle-on.png';
} else {
  musicQueue = [...originalQueue];
  isShuffleActive = false;
  document.getElementById('shuffleButtonIcon').src = '/front-end/icons/shuffle.png';
  
}
currentSongIndex = 0; // Reset to the first song of the (new) queue
currentSong = musicQueue[currentSongIndex]; 
updatePlayer();
}




function playPauseSong() {
const img = document.getElementById('img');
const playPauseIcon = document.getElementById('playPauseIcon');
if (audio.paused) {
  audio.play().then(() => {
    playPauseIcon.src = '/front-end/icons/pause.png';

  }).catch(error => console.error("Playback failed", error));
} else {
  audio.pause();
  playPauseIcon.src = '/front-end/icons/play.png';
}
}

function addToPlaylist() {
}





function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.container input[type="text"]');
  
  const handleSearch = debounce(function() {
    const query = searchInput.value.trim();
    const playlistIdRegex = /playlist\/([a-zA-Z0-9]+)(?:\/|\?si=)?/;
    const match = query.match(playlistIdRegex);
    
    console.log(query, match, playlistIdRegex);

    if (match) {
      const playlistId = match[1];
      fetchPlaylistOrTracks(playlistId, 'playlist');
    } else if (query) {
      fetchPlaylistOrTracks(query, 'query');
      console.log('Search for:', query);
    }
  }, 500);
  
  searchInput.addEventListener('input', handleSearch);
});


function fetchPlaylistOrTracks(id, type) {
  if (type === 'playlist') {
    result = url+`playlist?id=${id}`;
  }
  else if(type === 'query'){
    result = url+`query?q=${id}`;
  }
  fetch(result)
    .then(response => response.json())
    .then(data => {
      if (type === 'playlist') {
        const playlistInfo = data.info;
        console.log(playlistInfo);
        const playlistData = [{
        id: id,
        title: playlistInfo.playlist_name, 
        img: playlistInfo.playlist_image
      }];
      displaySearchResults(playlistData, true);
      }
      else if (type === 'query') {
        console.log(data);
        const searchResults = data.map(track => ({ title: track.title, img: track.img, id: track.id}));
        displaySearchResults(searchResults);
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displaySearchResults(results, playlist = false) {
  const searchOutputElement = document.getElementById('searchResultsContainer');
  searchOutputElement.classList.add('search-results');
  searchOutputElement.innerHTML = ''; // Clear previous results
  
  results.forEach((result, index) => {
    if(!playlist)
    {songComponent = createSongComponent(result, index); }
    else{
      songComponent = createSongComponent(result, index, true, false, false);
    }
    searchOutputElement.appendChild(songComponent);
  });
}





let hideSearchResultsTimeout;

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.container input[type="text"]');
  const searchResultsContainer = document.getElementById('searchResultsContainer');

  searchInput.addEventListener('focus', function() {
    searchResultsContainer.style.display = 'block';
  });

  searchInput.addEventListener('blur', function() {
    // Set a timeout to hide the search results so that it allows time for a click to be registered
    hideSearchResultsTimeout = setTimeout(() => {
      searchResultsContainer.style.display = 'none';
    }, 300);
  });

  searchResultsContainer.addEventListener('click', function(event) {
    clearTimeout(hideSearchResultsTimeout); // If a click is registered within the container, do not hide it
  });

  document.addEventListener('click', function(event) {
    const isClickInsideInput = searchInput.contains(event.target);
    const isClickInsideSearchResults = searchResultsContainer.contains(event.target);

    if (!isClickInsideInput && !isClickInsideSearchResults) {
      searchResultsContainer.style.display = 'none';
    }
  });
});












// Set default active tab and its indicator
document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.getElementsByClassName('tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (evt) {
      activateTab(evt, this.textContent); // Pass the tab name (Player, Queue, Playlist) based on the text of the tab clicked
    });
  }
  // Trigger click on the first tab to set the initial state
  if (tabs.length > 0) {
    tabs[0].click();
  }
  initMusicQueue();

  document.documentElement.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
      playPauseSong();
    } else if (event.key === 'ArrowRight') {
      nextSong();
    } else if (event.key === 'ArrowLeft') {
      previousSong();
    }
  });
  
  document.getElementById('playPauseButton').addEventListener('click', playPauseSong);
  document.getElementById('previousButton').addEventListener('click', previousSong);
  document.getElementById('nextButton').addEventListener('click', nextSong);
  document.getElementById('shuffleButton').addEventListener('click', shuffleSongs);
  document.getElementById('addToPlaylistButton').addEventListener('click', addToPlaylist);
});