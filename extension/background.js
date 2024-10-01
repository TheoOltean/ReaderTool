// background.js

// Initialize the extension's enabled state
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ extensionEnabled: true });
  });
  
  // Function to create the context menu
  function createContextMenu() {
    chrome.contextMenus.create({
      id: "highlightMenu",
      title: "Show Highlight Menu",
      contexts: ["selection"]
    });
  }
  
  // Function to remove the context menu
  function removeContextMenu() {
    chrome.contextMenus.removeAll();
  }
  
  // Update the context menu based on the extension's state
  function updateContextMenu() {
    chrome.storage.sync.get("extensionEnabled", (data) => {
      if (data.extensionEnabled) {
        createContextMenu();
      } else {
        removeContextMenu();
      }
    });
  }
  
  // Listen for changes in the extension's enabled state
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && "extensionEnabled" in changes) {
      updateContextMenu();
    }
  });
  
  // Initial setup of the context menu
  updateContextMenu();
  
  // Handle clicks on the context menu item
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "highlightMenu") {
      chrome.tabs.sendMessage(tab.id, { action: "showHighlightMenu" });
    }
  });
  