var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) { 
  buttons[i].onclick = (function(id) { 
    return function() {
      window.parent.postMessage(id, "*");
    };
  })(buttons[i].id);
};
