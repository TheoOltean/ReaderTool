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

