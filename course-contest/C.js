const Templater = require('./templater')

const test = new Templater().div('rfhru', 'rjirg', new Templater().span(), {ru: 'efuh'})

console.log(test.toString())

