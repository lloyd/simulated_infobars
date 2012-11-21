(function() {
  var infobarStarter = function(request, sender, sendResponse) {
    // this event listener should be invoked no more than once
    chrome.extension.onMessage.removeListener(infobarStarter);

    // preventative medicine.  clean up if needed.
    var oldIFrame = document.getElementById(request.uniqueId);
    if (oldIFrame) document.body.removeChild(oldIFrame);
    delete document.body.style.webkitTransition;    
    
    // create the new iframe
    var iframe = document.createElement('iframe');
    iframe.id = request.uniqueId;
    iframe.src = chrome.extension.getURL(request.infobar_path);
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height =  request.height;
    iframe.style.top = "-" + request.height;
    iframe.style.marginTop = "0";
    iframe.style.padding = "0";
    iframe.style.border = "0";
    iframe.style.overflow = "hidden";
    iframe.style.webkitTransition = "top 0.35s";
    iframe.style.zIndex = "1000000000000";

    // append to document
    document.body.appendChild(iframe);

    // set up the document to CSS transition
    document.body.style.webkitTransition = "margin-top 0.35s";

    // now start the animation after letting the browser render our
    // iframe (hidden)
    setTimeout(function() {
      document.body.style.marginTop = request.height;
      delete document.body.style.webkitTransition;
      iframe.style.top = "0px";
    }, 100);

    // we will send no response to this message
    return false;
  }
  chrome.extension.onMessage.addListener(infobarStarter);
})(); 
