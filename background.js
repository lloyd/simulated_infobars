chrome.browserAction.onClicked.addListener(function(tab) {
  SimluatedInfobar.run({ path: "my_infobar.html", tab: tab });
});
