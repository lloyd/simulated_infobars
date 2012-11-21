// the code that runs in the background and manages all of the infobars
var InfobarManager = (function() {
  return {
    run: function(opts, callback) {
      function runWithTab(tabId) {
        chrome.tabs.executeScript(
          tabId,
          { file: "infobar/lib/run_infobar.js" }, function() {
          // once script is running, let's message it the name of the
            // file it is to use as the infobar.
            chrome.tabs.sendMessage(
              tabId, { infobar_path: opts.path }, function(response) {
                console.log("infobar response:", response);
                callback && callback(response);
              });
          });
      }
      if (opts && opts.tab) runWithTab(opts.tab.id);
      else chrome.tabs.getSelected(function(tab) { runWithTab(tab.id) });
    }
  }
})();
