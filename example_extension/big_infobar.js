document.querySelector('button').onclick = function() { 
  window.parent.postMessage("ohai, I'm done", "*");
};
