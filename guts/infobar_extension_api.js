var SimluatedInfobar = (function() {
  return {
    run: function(opts) {
      chrome.tabs.executeScript(opts.tab.id || null, { file: "guts/run_infobar.js" }, function() {
        // once script is running, let's message it the name of the file it is to use
        // as the infobar.
        chrome.tabs.sendMessage(opts.tab.id, {infobar_path: opts.path}, function(response) {
          // i can't hear you.  nanny nanny.
        });
      });
    }
  };
})();

