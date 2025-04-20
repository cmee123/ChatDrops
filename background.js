chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'buttonClicked') {
    chrome.action.openPopup(); // or chrome.browserAction.openPopup()
  }
});
