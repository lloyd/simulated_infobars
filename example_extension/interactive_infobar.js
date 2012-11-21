document.querySelector('input').onkeyup = function(e) {
  if (e.keyCode == 13) {
    chrome.extension.sendMessage(
      { action: "check_pin", code: e.target.value },
      function(response) {
        if (response) {
          CompleteInfobar("she got the pin code correct");
        } else {
          document.querySelector("#wrong").style.display = "inline";
        }
      });
  }
};
