import "./contentscript.scss";

console.log("gday gday");
const findAddress = () => {
  const address = document.querySelector("h1");

  if (address) {
    return address.textContent;
  }

  return;
};

const address = findAddress();

if (address) {
  chrome.runtime.sendMessage({ address });
}

chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
  if (req.getAddress) {
    sendResponse({ address: findAddress() });
    chrome.browserAction.setBadgeText({ text: "!", tabId: sender.tab.id });
  }
});
