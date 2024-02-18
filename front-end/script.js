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
  
  

  
  musicQueue = [
    { title: "Song 1", artist: "Artist 1", albumArt: "url-to-album-art-1.jpg", url: "front-end/icons/ram_siya.mp3", duration: 200 },
    { title: "Song 2", artist: "Artist 2", albumArt: "url-to-album-art-2.jpg", url: "https://www.pagalworld.com.cm/siteuploads/files/sfd134/66697/%20Ram%20Siya%20Ram(PagalWorld.com.cm).mp3", duration: 200 },
    { title: "Song 3", artist: "Artist 3", albumArt: "url-to-album-art-3.jpg", url: "/mnt/devesh/code/projects_git/musicAddict/front-end/icons/Ram Siya ram.mp3", duration: 200 }
  ];

let audio = new Audio();

function fetchSongsFromLastFm() {
  currentSongIndex = 0; // Reset to the first song
  currentSong = musicQueue[currentSongIndex]; // Set the current song to the first song
  updatePlayer();
  updateProgressBar();
}

function updatePlayer() {
  if (!currentSong) return; 
  document.getElementById('albumArt').src = currentSong.albumArt;
  document.getElementById('songTitle').textContent = currentSong.title;
  document.getElementById('songArtist').textContent = currentSong.artist;
  
  audio.src = currentSong.url;
  audio.addEventListener('loadedmetadata', function() {
    document.getElementById('totalTime').textContent = formatTime(Math.round(audio.duration));
  });

  audio.play().then(() => {
    document.getElementById('playPauseIcon').src = '/front-end/icons/pause.png';
  }).catch(error => console.error("Playback failed", error));

  updateProgressBar();
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
  clearInterval(progressInterval); // Clear any existing intervals before starting a new one

  // Update the progress bar as the song plays
  audio.ontimeupdate = function() {
    let currentProgress = audio.currentTime;
    let songDuration = audio.duration;
    document.getElementById('progressBar').style.width = `${(currentProgress / songDuration) * 100}%`;
    document.getElementById('currentTime').textContent = formatTime(Math.round(currentProgress));
  };
}



function previousSong() {
  clearInterval(progressInterval);
  currentSongIndex = currentSongIndex > 0 ? currentSongIndex - 1 : musicQueue.length - 1;
  currentSong = musicQueue[currentSongIndex];
  updatePlayer();
  // updateProgressBar();
}

// Function to play the next song
function nextSong() {
  clearInterval(progressInterval);
  currentSongIndex = (currentSongIndex + 1) % musicQueue.length;
  currentSong = musicQueue[currentSongIndex];
  updatePlayer();
  // updateProgressBar();
}

// function shuffleSongs() {
//   for (let i = musicQueue.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
//     [musicQueue[i], musicQueue[j]] = [musicQueue[j], musicQueue[i]]; // Swap elements
//   }
//   currentSongIndex = 0; // Reset to the first song of the shuffled array MAKE SURE TO UPDAT THE QUEUE AFTERE THIS 
//   updatePlayer();
//   updateProgressBar(); // Reset the progress bar for the new song
// }

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
  updateProgressBar();
}


function playPauseSong() {
  if (audio.paused) {
    audio.play().then(() => {
      document.getElementById('playPauseIcon').src = '/front-end/icons/pause.png';
    }).catch(error => console.error("Playback failed", error));
  } else {
    audio.pause();
    document.getElementById('playPauseIcon').src = '/front-end/icons/play.png';
  }
}


function addToPlaylist() {
  pass; // Replace with actual logic to add the current song to the playlist
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
    fetchSongsFromLastFm();
    document.getElementById('playPauseButton').addEventListener('click', playPauseSong);
    document.getElementById('previousButton').addEventListener('click', previousSong);
    document.getElementById('nextButton').addEventListener('click', nextSong);
    document.getElementById('shuffleButton').addEventListener('click', shuffleSongs);
    document.getElementById('addToPlaylistButton').addEventListener('click', addToPlaylist);
    // Fetch songs from Last.fm when the document is ready (simulated for this example)
  });
