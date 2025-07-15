const toggle = document.getElementById('toggle');

// Load saved setting (default ON)
chrome.storage.sync.get(['darkModeEnabled'], (data) => {
  toggle.checked = data.darkModeEnabled !== false;
});

// Save setting on toggle change
toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ darkModeEnabled: toggle.checked }, () => {
    // Optionally refresh active tab to apply/remove dark mode immediately
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });
});
