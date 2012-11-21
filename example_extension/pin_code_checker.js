chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    // only respond if this is a 'check_pin' message from code rendered
    // by our extension
    if (request && request.action === 'check_pin') {
      sendResponse(request.code === '1234');
    }
  });
