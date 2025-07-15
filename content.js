chrome.storage.sync.get(['darkModeEnabled'], (data) => {
  // Default ON (if undefined or true)
  if (data.darkModeEnabled !== false) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('dm.css');
    document.head.appendChild(link);
    console.log('Dark mode CSS injected');
  } else {
    console.log('Dark mode disabled by user');
  }
});
