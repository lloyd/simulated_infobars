(function() {
  var infobarStopper = function(request, sender, sendResponse) {
    // this event listener should be invoked no more than once
    chrome.extension.onMessage.removeListener(infobarStopper);

    // let's find that infobar
    var iframe = document.getElementById(request.uniqueId);

    // if we could not find an iframe, we're done
    if (iframe) {
      // reset body marginTop to zero in all cases
      document.body.style.marginTop = "0px";

      // now, did we get a proper height for iframe?  if so, we can
      // have a nice transition out.  if not, then we will just delete it
      if (request.height) {
        // transition nicely
        iframe.style.top = "-" + request.height;

        // after transition is complete, reverse all changes we've made
        // to this poor websites DOM.
        setTimeout(function() {
          delete document.body.style.webkitTransition;
          document.body.removeChild(iframe);
        }, 400);
      } else {
        // just kill it
        delete document.body.style.webkitTransition;
        document.body.removeChild(iframe);
      }
    }
  }
  chrome.extension.onMessage.addListener(infobarStopper);
})();
