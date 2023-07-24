chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content_script.js"],
  });
});

chrome.runtime.setUninstallURL("https://candle.fi?utm_source=chrome_extension");
