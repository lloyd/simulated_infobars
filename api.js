// a tiny wrapper API to be loaded by web content in an iframe to
// make communicating responses simpler
window.CompleteInfobar = function(msg) {
  chrome.extension.sendMessage({
    action: 'infobar_complete',
    msg: msg
  });
};
