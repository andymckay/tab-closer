function closeDuplicates() {
  let found = [];
  let closed = 0;

  chrome.tabs.query({}, (tabs) => {
    for (let tab of tabs) {
      if (found.includes(tab.url)) {
        chrome.tabs.remove(tab.id);
        closed++;
      } else {
        found.push(tab.url);
      }
    }
    chrome.notifications.create(
      'remove-duplicates', {
        'message': `Number of tabs closed: ${closed}.`,
        'title': 'Close Duplicates',
        'type': 'basic',
        'iconUrl': 'icon.svg'
    });
  });
}

chrome.browserAction.onClicked.addListener(closeDuplicates);
