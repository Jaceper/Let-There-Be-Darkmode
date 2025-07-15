const toggle = document.getElementById('toggle');

chrome.storage.sync.get(['darkModeEnabled'], (data) => {
  toggle.checked = data.darkModeEnabled !== false; // default ON
});

toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ darkModeEnabled: toggle.checked });
});
