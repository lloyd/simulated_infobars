document.querySelector('button').onclick = function() { 
  chrome.extension.sendMessage({
    action: 'complete_infobar',
    msg: "ohai, I'm done"
  });
};
