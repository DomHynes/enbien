chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.address) {
    chrome.browserAction.setBadgeText({ text: '!', tabId: sender.tab.id });
  }
});
