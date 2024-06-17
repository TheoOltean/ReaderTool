document.addEventListener('mouseup', function(e) {
    const selection = window.getSelection();
    const popupMenu = document.getElementById('popup-menu');

    if (selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        popupMenu.style.top = `${rect.top + window.scrollY + rect.height}px`;
        popupMenu.style.left = `${rect.left + window.scrollX}px`;
        popupMenu.style.display = 'block';
    } else {
        popupMenu.style.display = 'none';
    }
});

document.addEventListener('mousedown', function(e) {
    const popupMenu = document.getElementById('popup-menu');
    if (!popupMenu.contains(e.target)) {
        popupMenu.style.display = 'none';
    }
});