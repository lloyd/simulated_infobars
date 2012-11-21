chrome.browserAction.onClicked.addListener(function(tab) {
  SimluatedInfobar.run({ path: "example_extension/my_infobar.html", tab: tab });
});
