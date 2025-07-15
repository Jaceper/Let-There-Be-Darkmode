const toggle = document.getElementById('toggle');

chrome.storage.sync.get(['darkModeEnabled'], (data) => {
  toggle.checked = data.darkModeEnabled !== false;
});

toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ darkModeEnabled: toggle.checked }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });
});
