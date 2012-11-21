// the code that runs in the background and manages all of the infobars
var InfobarManager = (function() {
  // all iframes have tab-unique ids.
  function genUniqueId(tabId) {
    return "__simulated_infobars_" + tabId;
  }

  // a table of running infobars, mapping tab ids to:
  //  cb: "oncomplete" functions
  //  height: height of the infobar (needed for transitioning out) 
  var running = {};

  // listen for messages coming in from content which represent
  // "infobar complete".  At this point we should 
  chrome.extension.onMessage.addListener(
    function(request, sender) {
      if (sender.tab && request &&
          request.action == 'infobar_complete')
      {
        console.log("infobar completes:", request.msg); 
        // let's tear down the infobar
        var record = running[sender.tab.id];
        delete running[sender.tab.id];
        // when would a record not exist?  yikes!  This would be the
        // case that an infobar completes in content-land but has been
        // sinced deleted from the manager.  we'll just construct a
        // fake record which will delete it
        if (!record) record = { height: null };
        
        chrome.tabs.executeScript(
          sender.tab.id, { file: "infobar/lib/stop_infobar.js" }, function() {
            // tell the stop script the unique id of the iframe and
            // its height so it can transition out properly
            chrome.tabs.sendMessage(
              sender.tab.id, {
                height: record.height,
                uniqueId: genUniqueId(sender.tab.id)
              } /* there will be no response to this message */);
          });

        // now that things are cleaned up, let's invoke the callback
        // if one was provided
        if (record.cb) record.cb(null, request.msg);
      }
      return false;
    });

  return {
    run: function(opts, callback) {
      opts = opts || {};
      opts.height = opts.height || "40px";
      function runWithTab(tabId) {
        // if there was a previous infobar running, it will be automatically
        // canceled
        if (running[tabId]) {
          if (running[tabId].cb) {
            running[tabId].cb("another infobar cancelled this one");
          }
          delete running[tabId];
        }

        // now register the new completion handler
        running[tabId] = {
          cb: callback,
          height: opts.height
        };
                  
        chrome.tabs.executeScript(
          tabId,
          { file: "infobar/lib/start_infobar.js" }, function() {
            // once script is running, let's message it the name of the
            // file it is to use as the infobar.
            chrome.tabs.sendMessage(
              tabId, {
                infobar_path: opts.path,
                height: opts.height,
                uniqueId: genUniqueId(tabId)
              } /* there will be no response to this message */);
          });
      }
      if (opts && opts.tab) runWithTab(opts.tab.id);
      else chrome.tabs.getSelected(function(tab) { runWithTab(tab.id) });
    }
  }
})();
