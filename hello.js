console.log(3);

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  if (req.url == '/process'){
    res.write("Processing...");
  }
  else if (req.url == '/home') {
    res.write('Home page');
  }
  else {
  res.write('This is Vera from Lexington!');
  res.write("<form method = 'get' action = 'http://localhost:8080/process'>");
  //res.write("Your address:  <input type = 'text' name = 'textbox'>");
  res.write("<br> <input type='submit' value = 'Submit Here!'></form>");
  }
  res.end();
}).listen(8080);
