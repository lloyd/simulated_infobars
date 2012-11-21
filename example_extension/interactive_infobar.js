document.querySelector('input').onkeyup = function(e) {
  if (e.keyCode == 13) {
    chrome.extension.sendMessage(
      { code: e.target.value },
      function(response) {
        if (response) return window.parent.postMessage("she got it", "*");
        document.querySelector("#wrong").style.display = "inline";
      });
  }
};
