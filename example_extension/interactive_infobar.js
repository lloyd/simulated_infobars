document.querySelector('input').onkeyup = function(e) {
  if (e.keyCode == 13) {
    chrome.extension.sendMessage(
      { code: e.target.value },
      function(response) {
        console.log(response);
      });
  }
};

