var iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL("infobar_content.html");
document.body.appendChild(iframe);
alert("did it");
