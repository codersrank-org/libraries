var fs = require('fs');
fs.readFile( __dirname + '/../libraries.json', function (err, data) {
  if (err) {
    throw err; 
  }
  data = JSON.parse(data)
  let previousLibrary = ""
  for (library in data) {
    // Check alphabetical order
    if (library.toLowerCase() < previousLibrary.toLowerCase()) {
      console.log('ERROR: Libraries are not in alphabetical order. ' + previousLibrary + ' is before ' + library)
      process.exit(1)
    }
    previousLibrary = library

    // Check expected structure
    if (!Array.isArray(data[library].imports) || data[library].imports.length === 0) {
      console.log('ERROR: ' + library + '.imports must exist, must be an array and must have at least one element.')
      process.exit(1)
    }
    if (!Array.isArray(data[library].technologies)  || data[library].technologies.length === 0) {
      console.log('ERROR: ' + library + '.technologies must exist, must be an array and must have at least one element')
      process.exit(1)
    }
    if (typeof data[library].language === 'undefined' || data[library].language === '') {
      console.log('ERROR: ' + library + '.language must exist and cannot be empty')
      process.exit(1)
    }
    if (typeof data[library].description === 'undefined' || data[library].description === '') {
      console.log('ERROR: ' + library + '.description must exist and cannot be empty')
      process.exit(1)
    }
  }
});