
var MarkdownIt = require('markdown-it');
var del = require('del');
var fs = require('fs');

var md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    breaks: true,
    typographer: true
});

// console.log(md.core.ruler.getRules(""));
console.log(md.inline.ruler.getRules(""));

// md.core.ruler.push("special-term", function special_term_replace(state) {
//     var s = "";
//     console.log(state.tokens);
// });

// so, we look for unescaped {} and if we find one, we push a new token on the stack
// this should come before emphasis because a game term might be wrapped in a thing? 
// _{game term}_ depending on what the gameterm syntax is exactly. this might be normal, or a might be redundant. 
// But, {_term_} will not respect the italics inside the special term markers. That's what we want. 
// So does that mean it should go before or after emphasis?
// game term can totally be in a header though
// it's a generally a formatting thing. sure, most game terms should be a span anyway so they can show up most places. 
// 

md.inline.ruler.after("emphasis", "special-term", function special_term(state) {

    // when we hit the closing } skip it.
    if (state.src.charCodeAt(state.pos) === 0x7D) {
        return false;
    }

    // start at pos for the first { and determine if this is level 1, 2, or 3. 
    // four is not special term.
    // then find the matching number of closing }. 
    // if we can't find them this is not a special term
    // then we 

    console.log(state.src);


    // trick is to match the closing braces too. otherwise we'll not do anything

});

var file = fs.readFileSync("./test.md");
var text = file.toString();

var result = md.render(text);

console.log(result);