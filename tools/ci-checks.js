let fs = require('fs')

fs.readFile( __dirname + '/../libraries.json', function (err, data) {
  if (err) {
    throw err; 
  }
  data = JSON.parse(data.toString());

  if (typeof data !== 'object') {
    throw new Error('Expected JSON object');
  }

  let previousLanguage = ""
  let error = []

  // javaScript and TypeScript must be the same
  if (JSON.stringify(data["JavaScript"]) !==  JSON.stringify(data["TypeScript"])) {
    error.push('ERROR: JavaScript and TypeScript must have the same libraries and same values.')
  }

  Object.keys(data).forEach(function(language) {
    // Check alphabetical order of languages
    if (language.toLowerCase() < previousLanguage.toLowerCase()) {
      error.push('ERROR: Languages are not in alphabetical order. ' + previousLanguage + ' is before ' + language)
    }

    previousLanguage = language

    let previousLibrary = ""
    for (library in data[language]){
      // Check alphabetical order of libraries
      if (library.toLowerCase() < previousLibrary.toLowerCase()) {
        error.push('ERROR: Libraries are not in alphabetical order. ' + previousLibrary + ' is before ' + library + ' for ' + language)
      }
      previousLibrary = library

      // Check expected structure
      if (!Array.isArray(data[language][library].imports) || data[language][library].imports.length === 0) {
        error.push('ERROR: ' + language + '.'  + library + '.imports must exist, must be an array and must have at least one element.')
      }
      if (!Array.isArray(data[language][library].technologies)  || data[language][library].technologies.length === 0) {
        error.push('ERROR: ' + language + '.'  + library + '.technologies must exist, must be an array and must have at least one element')
      }
      if (typeof data[language][library].description === 'undefined' || data[language][library].description === '') {
        error.push('ERROR: ' + language + '.' + library + '.description must exist and cannot be empty')
      }
      if (data[language][library].description) {
        if (typeof data[language][library].description !== 'string') {
          error.push('ERROR: ' + language + '.' + library + '.description must be of type string');
        }
      }
      if (data[language][library].image) {
        if (typeof data[language][library].image !== 'string') {
          error.push('ERROR: ' + language + '.' + library + '.image must be of type string');
        }
      }
    }
  })

  if (error.length > 0) {
    for (let i of error) {
      console.log(i);
    }
  }

});