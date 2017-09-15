function closeDuplicates() {
  let found = [];
  let closed = 0;

  browser.tabs.query({})
  .then((tabs) => {
    for (let tab of tabs) {
      // Add in cookieStoreId so that if a URL is opened
      // with different contextual identities, it doesn't get closed.
      let key = `${tab.url}-${tab.cookieStoreId}`;
      if (found.includes(key)) {
        browser.tabs.remove(tab.id);
        closed++;
      } else {
        found.push(key);
      }
    }
  })
  .then(() => {
    browser.notifications.create(
      'remove-duplicates', {
        'message': closed ? `Number of tabs closed: ${closed}.`: `No tabs closed.`,
        'title': 'Close Duplicates',
        'type': 'basic'
    });
  });
}

browser.browserAction.onClicked.addListener(closeDuplicates);
