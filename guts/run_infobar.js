chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  var iframe = document.createElement('iframe');
  iframe.src = chrome.extension.getURL(request.infobar_path);
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100%";
  iframe.style.height = "0px";
  iframe.style.marginTop = "0";
  iframe.style.padding = "0";
  iframe.style.border = "0";
  iframe.style.overflow = "hidden";
  iframe.style.opacity = "0.9";
  iframe.style.webkitTransition = "height 0.35s";
  iframe.style.zIndex = "1000000000000";
  document.body.appendChild(iframe);
  document.body.style.webkitTransition = "margin-top 0.35s";
  setTimeout(function() {
    document.body.style.marginTop = "40px";
    iframe.style.height = "40px";
  }, 0);
  window.addEventListener('message', function(message) {
    // defend against messages we don't care about
    if (iframe.src.indexOf(message.origin) !== 0) return;
    // transition out!
    document.body.style.marginTop = "0px";
    iframe.style.height = "0px";
    // after transition is complete, remove any remnants from the dom
    setTimeout(function() {
      document.body.removeChild(iframe);
    }, 400);
    sendResponse(message.data);
  });
  // asynchronous reponse, must return true
  return true;
});
