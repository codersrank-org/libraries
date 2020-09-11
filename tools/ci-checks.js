var fs = require('fs');
fs.readFile( __dirname + '/../libraries.json', function (err, data) {
  if (err) {
    throw err; 
  }
  data = JSON.parse(data)

  let previousLanguage = ""
  Object.keys(data).forEach(function(language) {
    // Check alphabetical order of languages
    if (language.toLowerCase() < previousLanguage.toLowerCase()) {
      console.log('ERROR: Languages are not in alphabetical order. ' + previousLanguage + ' is before ' + language)
      process.exit(1)
    }
    previousLanguage = language

    let previousLibrary = ""
    for (library in data[language]){
      // Check alphabetical order of libraries
      if (library.toLowerCase() < previousLibrary.toLowerCase()) {
        console.log('ERROR: Libraries are not in alphabetical order. ' + previousLibrary + ' is before ' + library + ' for ' + language)
        process.exit(1)
      }
      previousLibrary = library

      // Check expected structure
      if (!Array.isArray(data[language][library].imports) || data[language][library].imports.length === 0) {
        console.log('ERROR: ' + language + '.'  + library + '.imports must exist, must be an array and must have at least one element.')
        process.exit(1)
      }
      if (!Array.isArray(data[language][library].technologies)  || data[language][library].technologies.length === 0) {
        console.log('ERROR: ' + language + '.'  + library + '.technologies must exist, must be an array and must have at least one element')
        process.exit(1)
      }
      if (typeof data[language][library].description === 'undefined' || data[language][library].description === '') {
        console.log('ERROR: ' + language + '.' + library + '.description must exist and cannot be empty')
        process.exit(1)
      }
    }
  })
});