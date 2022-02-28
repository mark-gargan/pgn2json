require("../index.js")

var fs = require('fs');

fs.readFile('wc2021.6.pgn', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(pgn2json.parse(data));
});