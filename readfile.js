console.log(2);

var http = require('http');
var fs = require('fs');
var readline = require('readline');


http.createServer(function (req, res) {
    fs.access('./companies.csv', err => err ? 'does not exist' : 'exists');
    var stream = fs.createReadStream("./companies.csv");
    rl = readline.createInterface({ input: stream });
    let data = [];
    rl.on("line", (row) => {
    res.write("read a row");
    data.push(row.split(","));
    });
    for (let i = 0; i < data.length; i++) {
        res.write(data[i]);
    }
    res.write("done!");
  res.end();
}).listen(process.env.PORT || 8080 || 3000);
