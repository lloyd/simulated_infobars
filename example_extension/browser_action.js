document.querySelector("#basic").onclick = function(e) {
  e.preventDefault();
  SimluatedInfobar.run(
    { path: "example_extension/basic_infobar.html" }
  );
  window.close();
};

document.querySelector("#interact").onclick = function(e) {
  e.preventDefault();
  SimluatedInfobar.run(
    { path: "example_extension/interactive_infobar.html" }
  );
  window.close();
};
