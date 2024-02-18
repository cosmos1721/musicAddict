chrome.runtime.onInstalled.addListener(() => {
    checkLoginStatus();
  });
  
  chrome.runtime.onStartup.addListener(() => {
    checkLoginStatus();
  });
  
  function checkLoginStatus() {
    chrome.storage.local.get(['token'], function(result) {
      if (result.token) {
        // User is logged in
        chrome.browserAction.setPopup({popup: 'app.html'});
      } else {
        // User is not logged in
        chrome.browserAction.setPopup({popup: 'login.html'});
      }
    });
  }
  