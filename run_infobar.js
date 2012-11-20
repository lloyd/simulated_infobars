var iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL("infobar_content.html");
iframe.style.position = "fixed";
iframe.style.top = "0";
iframe.style.left = "0";
iframe.style.width = "100%";
iframe.style.height = "0px";
iframe.style.marginTop = "0";
iframe.style.padding = "0";
iframe.style.border = "0";
iframe.style.overflow = "hidden";
iframe.style.opacity = "0.9";
iframe.style.webkitTransition = "height 0.35s";
iframe.style.zIndex = "1000000000000";
document.body.appendChild(iframe);
setTimeout(function() {
  iframe.style.height = "40px";
}, 0);
