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
    { title: "Song 1", artist: "Artist 1", albumArt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkrFlvX7gzW284Kw2lz6_MJ0ZOq8pEOfq8ixfKP5ADOw&s", url: "https://music.youtube.com/watch?v=r7Rn4ryE_w8&si=_GebGmX1SGAWw8EN" , duration: 300},
    { title: "Song 2", artist: "Artist 2", albumArt: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/zomato-sixteen_nine.jpg?VersionId=V5.IIjNl0yTWW2VsCOsNdenhYf6z4KvS&size=690:388", url: "https://www.pagalworld.com.cm/siteuploads/files/sfd134/66697/%20Ram%20Siya%20Ram(PagalWorld.com.cm).mp3", duration : 100},
    { title: "Song 3", artist: "Artist 3", albumArt: "url-to-album-art-3.jpg", url: "/mnt/devesh/code/projects_git/musicAddict/front-end/icons/Ram Siya ram.mp3", duration: 200 }
  ];
  
  let musicQueue = [... musicQueue1];

let audio = new Audio();
currentSongIndex = 0; 


function initMusicQueue() {
  currentSong = musicQueue[currentSongIndex]; // Set the current song to the first song
  updatePlayer();
  displayQueue();
  updateProgressBar();
}

function displayQueue() {
  const queueElement = document.getElementById('Queue'); // Target the Queue section
  // Clear existing queue content, but keep the title
  
  const list = document.createElement('ul'); // Create a new list for the queue items
  musicQueue.forEach(song => {
    const listItem = document.createElement('li');
    listItem.textContent = song.title; // Each item shows the song title
    list.appendChild(listItem); // Add the song to the list
  });

  queueElement.appendChild(list); // Append the list to the Queue section
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


  