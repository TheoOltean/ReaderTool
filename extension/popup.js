function handleTabsQuery(tabs)
{
    chrome.runtime.sendMessage({action : 'extract', tabId : tabs[0].id})
}
function handleExtractionButton()
{
    var newParagraph = document.createElement('p');
    newParagraph.setAttribute('id', 'content');
    chrome.tabs.query({active: true, currentWindow: true }, handleTabsQuery)
}
function handleDomLoaded()
{
    document.getElementById('extractionButton').addEventListener('click', handleExtractionButton)
}

document.addEventListener('DOMContentLoaded', handleDomLoaded)

// popup.js

const toggleButton = document.getElementById("toggleButton");

// Set the initial button text based on the extension's state
chrome.storage.sync.get("extensionEnabled", (data) => {
  updateButtonText(data.extensionEnabled);
});

// Toggle the extension's enabled state when the button is clicked
toggleButton.addEventListener("click", () => {
  chrome.storage.sync.get("extensionEnabled", (data) => {
    const newState = !data.extensionEnabled;
    chrome.storage.sync.set({ extensionEnabled: newState }, () => {
      updateButtonText(newState);
    });
  });
});

// Update the button text
function updateButtonText(isEnabled) {
  toggleButton.textContent = isEnabled ? "Turn Off Extension" : "Turn On Extension";
}
