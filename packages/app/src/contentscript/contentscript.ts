import './contentscript.scss';

const findAddress = () => {
  const address = document.querySelector('#listing_address');

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

    chrome.browserAction.setBadgeText({ text: '!', tabId: sender.tab.id });
  }
});
