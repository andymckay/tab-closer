function closeDuplicates() {
  let found = [];

  browser.tabs.query({})
  .then((tabs) => {
    for (let tab of tabs) {
      if (found.includes(tab.url)) {
        browser.tabs.remove(tab.id);
      } else {
        found.push(tab.url);
      }
    }
  });
}

browser.browserAction.onClicked.addListener(closeDuplicates);
