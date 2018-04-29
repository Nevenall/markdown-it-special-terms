var MarkdownIt = require('markdown-it');
var fs = require('fs');
var terms = require('./index')

var md = new MarkdownIt({
   html: true,
   xhtmlOut: true,
   breaks: true,
   typographer: true
});

md.use(terms, {
   open_1: "<span class='game-term'>",
   close_1: "</span>",
   open_2: "<aside class='callout'>",
   close_2: "</aside>",
   open_3: "<div class='stat-block'>",
   close_3: "</div>"
});

var file = fs.readFileSync("./test.md");

var text = file.toString();

var other = `A {sentence} with two special {terms}.`;

var result = md.render(text);

console.log(result);