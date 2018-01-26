'use strict';

var MarkdownIt = require('markdown-it');
var fs = require('fs');

var md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    breaks: true,
    typographer: true
});

// console.log(md.core.ruler.getRules(""));
//console.log(md.inline.ruler.getRules(""));

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

    var start = state.src.indexOf('{');
    var firstCode = state.src.charCodeAt(start);
    var secondCode = state.src.charCodeAt(start + 1);
    var thirdCode = state.src.charCodeAt(start + 2);
    var level = 0;
    var indexOfClosingBrace = 0;
    var content = null;

    // when we hit closing }'s skip them.
    if (state.src.charCodeAt(state.pos) === closeBrace) {
        return false;
    }

    // determine what level of special term this is
    if (firstCode === openBrace) {
        level = 1;
        indexOfClosingBrace = state.src.lastIndexOf("}");
    }
    if (secondCode === openBrace) {
        level = 2;
        indexOfClosingBrace = state.src.lastIndexOf("}}");
    }
    if (thirdCode === openBrace) {
        level = 3;
        indexOfClosingBrace = state.src.lastIndexOf("}}}");
    }

    // get the content which is from the last openbrace to the last index of closing
    if (indexOfClosingBrace > 0 && indexOfClosingBrace <= state.posMax) {

        content = state.src.substring(start + level, indexOfClosingBrace);

        // the content of special terms are treated as literals 
        // unless it's empty, then we don't do the thing. 

        // if (content === "") {
        //     var s = "";
        //     // Should we replace empty content? or leave it? Would it be strange if we didn't? 

        // }   


        token = state.push('special_open', )

    }






    // if we find the expected closing braces
    // skip level number of tokens

    // for (var i; i < level; ++i) {
    //     state.md.inline.skipToken(state);
    // }


    // start at pos for the first { and determine if this is level 1, 2, or 3. 
    // four is not special term.
    // then find the matching number of closing }. 
    // if we can't find them this is not a special term

    // need to find the last matching close brace, because 
    // it might be easier for more then {{{to be an escape}}}
    // essencially you are a third level term who's content is {term}
    // that might be more like what we expect
    // 

    // Match braces
    // start at the end, go backwards and find the matching number of braces




    console.log(`level ${level} : ${state.src} : ${content}`);
});

var file = fs.readFileSync("./test.md");
var text = file.toString();

var result = md.render(text);

console.log(result);