chrome.storage.sync.get(['darkModeEnabled'], (data) => {
  if (data.darkModeEnabled !== false) {  // default ON
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('dm.css');
    document.head.appendChild(link);
  }
});
