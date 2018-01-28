'use strict';

var MarkdownIt = require('markdown-it');
var fs = require('fs');
var sub = require('./subscript_example')

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

 // todo - increment state.pos and call skip token the correct number of times. 
        // then set the pos and posMax to braket the content of the special term
        // for when we push the new tokens. 
        // then set them to be past the special term just before we return. 

        // 
        // Depending on the level, we add the appropriate tokens.

        // Skip token, i guess this is right? Or do we have to do it once per level?

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
    var originalPosition = state.pos;
    var originalMax = state.posMax;

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

        content = state.src.slice(start + level, indexOfClosingBrace);

        state.pos = start + level;
        state.posMax = indexOfClosingBrace;

        while(state.pos < originalMax) {
            // if the current pos character is 
            state.md.inline.skipToken(state);
        }

        // skip token will advance state.pos, which we undo
       // make sure skip token doesn't advance beyond max?
        state.pos = start + level;
        state.posMax = indexOfClosingBrace;

        switch (level) {
            case 1:
                var token = state.push('special_term_1_open', '', 1);
                token.markup = '{';

                token = state.push('text', '', 0);
                token.markup = content;

                token = state.push('special_term_1_close', '', -1);
                token.markup = '}';
                break;
            case 2:
                var token = state.push('special_term_2_open', '', 1);
                token.markup = '{{';

                token = state.push('text', '', 0);
                token.markup = content;

                token = state.push('special_term_2_close', '', -1);
                token.markup = '}}';
                break;
            case 3:
                var token = state.push('special_term_3_open', '', 1);
                token.markup = '{{{';

                token = state.push('text', '', 0);
                token.markup = content;

                token = state.push('special_term_3_close', '', -1);
                token.markup = '}}}';
                break;
            default:
                break;
        }
    }

    state.pos = indexOfClosingBrace + 1;
    state.posMax = originalMax;



    console.log(`level ${level} : ${state.src} : ${content}`);
});

md.renderer.rules["special_term_1_open"] = function (tokens, idx, options, env, renderer) {
    return "<span class='special-term-1'>";
}

md.renderer.rules["special_term_2_open"] = function (tokens, idx, options, env, renderer) {
    return "<span class='special-term-2'>";
}
md.renderer.rules["special_term_3_open"] = function (tokens, idx, options, env, renderer) {
    return "<span class='special-term-3'>";
}

md.renderer.rules["special_term_1_close"] = function (tokens, idx, options, env, renderer) {
    return "</span>";
}

md.renderer.rules["special_term_2_close"] = function (tokens, idx, options, env, renderer) {
    return "</span>";
}

md.renderer.rules["special_term_3_close"] = function (tokens, idx, options, env, renderer) {
    return "</span>";
}


 var file = fs.readFileSync("./test.md");

// var file = fs.readFileSync("./sub_test.md");




md.use(sub);


var text = file.toString();

var result = md.render(text);

console.log(result);