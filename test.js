'use strict';

var MarkdownIt = require('markdown-it');
var fs = require('fs');

var special = require('./index')

var md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    breaks: true,
    typographer: true
});

md.use(special);

var file = fs.readFileSync("./test.md");

var text = file.toString();

var result = md.render(text);

console.log(result);