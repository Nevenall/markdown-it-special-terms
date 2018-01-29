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

var other = `# This is a header containing a {special term}

{Level 1 Special Term}

{{Level 2 Special Term}}

{{{Level 3 Special Term}}}`;


var result = md.render(other);

console.log(result);