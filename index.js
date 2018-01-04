
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

// so, we look for unescaped {} and if we find one, we push a new token on the stack
// this should come before emphasis because a game term might be wrapped in a thing? 
// _{game term}_ depending on what the gameterm syntax is exactly. this might be normal, or a might be redundant. 
// so, 
// game term can totally be in a header though
// it's a generally a formatting thing. sure, most game terms should be a span anyway so they can show up most places. 
// 

md.inline.ruler.before("emphasis", "game-term", function game_term(state) {
    var s = "";
    console.log(state.tokens);
});

var file = fs.readFileSync("./test.md");
var text = file.toString();

var result = md.render(text);

console.log(result);