var SimluatedInfobar = (function() {
  return {
    run: function(opts) {
      setTimeout(function() { 
        var bgPage = chrome.extension.getBackgroundPage();
        bgPage.InfobarManager.run(opts);
      }, 0);
    }
  }
})();
