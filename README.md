# Overview
This repository contains a list of supported libraries, imports and technologies they belong to.

## Structure
The entire list as stored as a JSON object, where the library name is the key, and the value of such
property is a number of attributes such as import pattern, language, description, etc.

One library can be mapped to one single language only, but have multiple import patterns or technologies.

An example entry looks like:
```
	"Express": {
        "language": "Javascript"
		"imports": ["express"],
		"technologies": ["MVC", "Web Development"],
		"description": "Express is a minimal Node.js framework for web and mobile applications.",
		"image": "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png",
	}
```

### Deep dive into structure
As mentioned before, the key of the object is the ***library name***.

***Language*** defines what language this library belongs to. One library can be mapped to one language only, so in case of 
ambiguous libraries like Bootstrap, the choice has to be made which language it is mainly. Bootstrap is mainly CSS, even
though it involves some JavaScript. 

***Imports*** is an array of strings, that all map to this library. During the analysis of the repository, CodersRank extracts
imports that were used in the commits authored by the user. This may have a form of
- `Symfony\Component\HttpFoundation\Request`
- `github.com/micro/go-micro/client`
- `express`

The import name is not the exact string that should be matched, but rather the string the import starts with. Given this
rule, the above imports would match the following:
- `Symfony\`
- `github.com/micro/go-micro`
- `express`
  
Therefore if we import any package from go-micro, e.g. `github.com/micro/go-micro/client`, it would still match Go-micro library. 
Same applies for Symfony in PHP. `Express` is the exact match, but does not look any different from examples above, since the string
`express` starts with the substring `express`.

***Technologies*** are pretty self-explanatory. This mapping is used to calculate the score for a particular technology, and one library can be 
mapped to one of more technologies, as in the original example.

***Description*** is a field thast allows the Library description to be provided. 

***Image*** allows to attach a logo to the library. This takes a form of the URL pointing to any image renderable by major browsers.

## Contributing
All contributions are welcome, and CodersRank relies on such support. The rules are few, but essential:

- All fields apart of `description` and `image` are required.
- Please group Libraries by languages and maintain alphabetical order for both `libraries` and `languages`. Think SQL `ORDER BY language, library`.
- If providing description, make sure to include the dot `.` at the end of the line. Also make sure the spelling is correct and the description is accurate.

## TODO
* Enforce the rules above in the continious integration. Again, any contribution with a handy bash script for this would be greatly appreciated.
* Ensure correct JSON during the Continious Intergration pipeline.
* Currently the image is not used anywhere, but once it is displayed, particular restrictions on format and dimenstions need to be introduced. 
* More languages and more libraries 😀