document.querySelector('button').onclick = function() { 
  window.parent.postMessage("all done", "*");
};
