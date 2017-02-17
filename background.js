function closeDuplicates() {
  let found = [];
  let closed = 0;

  browser.tabs.query({})
  .then((tabs) => {
    for (let tab of tabs) {
      if (found.includes(tab.url)) {
        browser.tabs.remove(tab.id);
        closed++;
      } else {
        found.push(tab.url);
      }
    }
  })
  .then(() => {
    browser.notifications.create(
      'remove-duplicates', {
        'message': `Number of tabs closed: ${closed}.`,
        'title': 'Close Duplicates',
        'type': 'basic'
    });
  });
}

browser.browserAction.onClicked.addListener(closeDuplicates);
