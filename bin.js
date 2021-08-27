const BeticParser = require("./dist/index.js")

let parser = new BeticParser.default()
console.log(JSON.stringify(parser.parse(process.argv[2])))