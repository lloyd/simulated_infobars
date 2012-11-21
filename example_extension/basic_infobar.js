var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) { 
  buttons[i].onclick = (function(id) { 
    return function() {
      CompleteInfobar(id);
    };
  })(buttons[i].id);
};
