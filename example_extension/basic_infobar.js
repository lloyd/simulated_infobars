var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) { 
  buttons[i].onclick = (function(id) { 
    return function() {
      chrome.extension.sendMessage({
        action: 'infobar_complete',
        msg: id
      });
    };
  })(buttons[i].id);
};
