## Whassis?

This is a little library that you can include in a chrome extension
to render infobars.  For your pleasure, this is itself an example
chrome extension that demonstrates how to use itself (very meta).

## Usage

### 1. submodule in this repository

    git submodule add git://github.com/lloyd/simulated_infobars infobar

### 2. run the infobar manager in your extension

    "background": {
      "scripts": [
        "infobar/manager.js",
        ... your other background scripts ...
      ]
    }

### 3. write an infobar

`my_infobar.html`:

    <html>
    <body>
      This is my infobar. <button>ok</button>
      <!-- gives you window.CompleteInfobar() which you call with
           a javascript object to end your infobar -->
      <script src="/infobar/api.js"></script>
      <script src="my_infobar.js"></script>
    </body>    
    </html>

`my_infobar.js`:

    document.querySelector('button').onclick = function() {
        CompleteInfobar("all done");
    };

### 4. add your infobar html to `web_accessible_resources`

    "web_accessible_resources": [
      "my_infobar.html",
      ... your other web accessible resources ...
    ]

### 5. to run your infobar, invoke it from your extension code

    InfobarManager.run({
      path: "/my_infobar.html",
      height: "50px"
    }, function(err, response) {
      console.log(err, response);
    });

