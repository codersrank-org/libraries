var fs = require('fs');
fs.readFile( __dirname + '/../libraries.json', function (err, data) {
  if (err) {
    throw err; 
  }
  data = JSON.parse(data)
  let previousLibrary = ""
  for (library in data) {
    if (library.toLowerCase() < previousLibrary.toLowerCase()) {
        console.log('ERROR: Libraries are not in alphabetical order. ' + previousLibrary + ' is before ' + library)
        process.exit(1)
    }
    previousLibrary = library
  }
});