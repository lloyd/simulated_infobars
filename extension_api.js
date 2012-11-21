// an interface that can be used to run infobars in extension code.
// This can be used from page actions, browser actions, or background
// javascript, and will forward calls to the "InfobarManager" which
// runs as persistent background javascript in your extension.
//
// See manager.js for API documentation, as all of the functions exported
// there are available via SimulatedInfobar.

var SimluatedInfobar = (function() {
  var bgPage = chrome.extension.getBackgroundPage();
  var api = {};
  // for every property on InfobarManager, create a forwarding
  // function
  Object.keys(bgPage.InfobarManager).forEach(function(func) {
    api[func] = function() {
      bgPage.InfobarManager[func].apply(
        bgPage.InfobarManager, arguments);
    };
  });
  return api;
})();
