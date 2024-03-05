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
  { title: "Song 2", albumArt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkrFlvX7gzW284Kw2lz6_MJ0ZOq8pEOfq8ixfKP5ADOw&s", url:"https://musicapi.x007.workers.dev/fetch?id=b64b134e4b8f37452cf94577dbaae5db9a50c7a57933f15813797c13dca4dc561cd87ea87e989c511d8c6ad9f8c433cbaab71ec362cff6db19e075744906718cd9ea215b99c508b78a11b66105a7a301", duration : 100},
  { title: "Song 3", albumArt: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388", url: "https://www.pagalworld.com.cm/siteuploads/files/sfd134/66697/%20Ram%20Siya%20Ram(PagalWorld.com.cm).mp3", duration : 100},
  { title: "Song 4", albumArt: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388", url: "https://www.pagalworld.com.cm/siteuploads/files/sfd134/66697/%20Ram%20Siya%20Ram(PagalWorld.com.cm).mp3", duration : 100},
  { title: "Song 5", albumArt: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388", url: "https://www.pagalworld.com.cm/siteuploads/files/sfd134/66697/%20Ram%20Siya%20Ram(PagalWorld.com.cm).mp3", duration : 100},
  { title: "Song 7", albumArt: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388", url: "https://www.pagalworld.com.cm/siteuploads/files/sfd134/66697/%20Ram%20Siya%20Ram(PagalWorld.com.cm).mp3", duration : 100}
];

savedSongs = []
playlistData1 = [
  { playlist_name: "playlist 1", playlist_image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388"},
  { playlist_name: "playlist 2", playlist_image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388"},
  { playlist_name: "playlist 3", playlist_image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388"},
  { playlist_name: "playlist 4", playlist_image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388"},
  { playlist_name: "playlist 5", playlist_image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388"}
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



function createSongComponent(song, index,  isPlaylistItem = false) {
  const songComponent = document.createElement('div');
  songComponent.classList.add('song-component');
  songComponent.dataset.index = index;

  // Album Art
  const albumArt = document.createElement('img');
  albumArt.src = song.albumArt;
  albumArt.alt = 'Album Art';
  albumArt.classList.add('song-image');
  songComponent.appendChild(albumArt);

  // Song title
  const songTitle = document.createElement('span');
  songTitle.textContent = song.title;
  songTitle.classList.add('song-title');
  songComponent.appendChild(songTitle);

  // Conditionally add delete button
  const deleteButton = document.createElement('img');
  deleteButton.src = '/front-end/icons/bin.png';
  deleteButton.alt = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() { 
      deleteSong(index, isPlaylistItem); };
    songComponent.appendChild(deleteButton);
    
    if (isPlaylistItem) {
      // Adjust click behavior based on whether it's a playlist item
    }
    
    // Queue item click behavior
    songComponent.addEventListener('click', (e) => {
      if (e.target !== deleteButton) {
        currentSongIndex = index;
        
        if (!isPlaylistItem) {        playSelectedSong();}
        highlightCurrentSong();
      }
    });

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
      title: playlist.playlist_name,
      albumArt: playlist.playlist_image
    }, index, true); // isDeletable is false, isPlaylistItem is true
    playlistElement.appendChild(playlistComponent);
  });
}

function displayQueue() {
  const queueElement = document.getElementById('Queue');
  queueElement.innerHTML = ''; // Clear existing content
  const list = document.createElement('div'); // Use a div to hold song components
  musicQueue.forEach((song, index) => {
    const songComponent = createSongComponent(song, index); // Pass index here
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




function updatePlayer() {
if (!currentSong) return; 
const mainPlayer = document.getElementById('body');
document.getElementById('albumArt').src = currentSong.albumArt;
document.getElementById('songTitle').textContent = currentSong.title;
audio.src = currentSong.url;
let blurredBackground = document.querySelector('.blurred-background');
if (!blurredBackground) {
  blurredBackground = document.createElement('div');
  blurredBackground.classList.add('blurred-background');
  mainPlayer.insertBefore(blurredBackground, mainPlayer.firstChild); // Insert as the first child
}
blurredBackground.style.backgroundImage = `url('${currentSong.albumArt}')`;
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

// Function to simulate song progress
// Declare a variable outside the function to hold the interval ID
let progressInterval;

function updateProgressBar() {

const progressBar = document.querySelector(".slider .progress");
audio.ontimeupdate = () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percentage}%`;
  document.getElementById('currentTime').textContent = formatTime(Math.round(audio.currentTime));
  document.getElementById('totalTime').textContent = formatTime(Math.round(audio.duration));
};

// Allow user to seek within the song
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
const albumArt = document.getElementById('albumArt');
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