import("./src/parser.js");
module.exports = {
    parse: function(pgnstring) {
       return pgn2json.parse(pgnstring)
    }
};