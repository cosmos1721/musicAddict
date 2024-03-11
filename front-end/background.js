chrome.runtime.onInstalled.addListener(() => {
    checkLoginStatus();
  });
  
  chrome.runtime.onStartup.addListener(() => {
    checkLoginStatus();
  });
  
function checkLoginStatus() {
  let musicAddict = localStorage.getItem('musicAddictResponse');

    if (musicAddict) {
    
      (result) => {
        if (result.myId) {
          chrome.browserAction.setPopup({popup: 'main.html'});
        } else {
          // User is not logged in
          chrome.browserAction.setPopup({popup: 'index.html'});
        }
      };
      console.log('Data updated successfully.');
  } else {
      console.log('No data found in localStorage.');
  }
  }
  