
var MarkdownIt = require('markdown-it');
var fs = require('fs');
var terms = require('./index')

var md = new MarkdownIt({
   html: true,
   xhtmlOut: true,
   breaks: true,
   typographer: true
});

md.use(terms);

var file = fs.readFileSync("./test.md");

var text = file.toString();

var other = `A {sentence} with two special {terms}.`;

var result = md.render(text);

console.log(result);