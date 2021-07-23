chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req.address);
  if (req.address) {
    chrome.browserAction.setBadgeText({ text: "!", tabId: sender.tab.id });
  }
});
