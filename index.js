
var MarkdownIt = require('markdown-it');
var del = require('del');
var fs = require('fs');

var md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    breaks: true,
    typographer: true
});

console.log(md.core.ruler.getRules(""));
console.log(md.inline.ruler.getRules(""));

md.core.ruler.push("game-term", function game_term_replace(state) {
    var s = "";
    console.log(state.tokens);
});

md.inline.ruler.before("emphasis", "game-term", function game_term(state) {
    var s = "";
    console.log(state.tokens);


});

var file = fs.readFileSync("./test.md");
var text = file.toString();

var result = md.render(text);

console.log(result);