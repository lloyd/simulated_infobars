document.querySelector('input').onkeyup = function(e) {
  if (e.keyCode == 13) {
    chrome.extension.sendMessage(
      { action: "check_pin", code: e.target.value },
      function(response) {
        if (response) {
          chrome.extension.sendMessage({
            action: 'infobar_complete',
            msg: "she got it"
          });
        } else {
          document.querySelector("#wrong").style.display = "inline";
        }
      });
  }
};
