
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


    const openBrace = 0x7B;
    const closeBrace = 0x7D;

    var firstCode = state.src.charCodeAt(state.pos);
    var secondCode = state.src.charCodeAt(state.pos + 1);
    var thirdCode = state.src.charCodeAt(state.pos + 2);

    // when we hit closing }'s skip them.
    if (firstCode === closeBrace) {
        return false;
    }

    // determine what level of special term this is
    if (firstCode === openBrace) {
        level = 1;
    }
    if (secondCode === openBrace) {
        level = 2;
    }
    if (thirdCode === openBrace) {
        level = 3;
    }

    // if we find the expected closing braces
    // skip level number of tokens

    for (var i; i < level; ++i) {
        state.md.inline.skipToken(state);
    }


    // start at pos for the first { and determine if this is level 1, 2, or 3. 
    // four is not special term.
    // then find the matching number of closing }. 
    // if we can't find them this is not a special term

    // need to find the last matching close brace, because 
    // it might be easier for more then {{{to be an escape}}}
    // essencially you are a third level term who's content is {term}
    // that might be more like what we expect
    // 


    console.log(level + ": " + state.src);


    // trick is to match the closing braces too. otherwise we'll not do anything

});

var file = fs.readFileSync("./test.md");
var text = file.toString();

var result = md.render(text);

console.log(result);