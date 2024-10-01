// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showHighlightMenu") {
    showHighlightMenu();
  }
});

function showHighlightMenu() {
  // Get the selected text range
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // Create the menu div
  const menuDiv = document.createElement("div");
  menuDiv.classList.add("highlight-menu");
  menuDiv.style.left = `${rect.left + window.scrollX}px`;
  menuDiv.style.top = `${rect.bottom + window.scrollY}px`;

  // Add multiple lines to the menu
  const lines = ["Definition", "Explain", "Symbol"];
  lines.forEach(line => {
    const lineDiv = document.createElement("div");
    lineDiv.textContent = line;
    lineDiv.addEventListener("click", () => {
      alert(`You clicked ${line}`);
      if (menuDiv.parentNode) {
        menuDiv.parentNode.removeChild(menuDiv);
      }
    });
    menuDiv.appendChild(lineDiv);
  });

  // Close the menu when clicking outside
  function handleClickOutside(event) {
    if (!menuDiv.contains(event.target)) {
      if (menuDiv.parentNode) {
        menuDiv.parentNode.removeChild(menuDiv);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);

  document.body.appendChild(menuDiv);
}
