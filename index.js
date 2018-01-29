'use strict';

var MarkdownIt = require('markdown-it');
var fs = require('fs');

var sub = require('./backticks')

var md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    breaks: true,
    typographer: true
});


md.inline.ruler.after("emphasis", "special-term", function special_term(state, silent) {
    const openBrace = 0x7B;
    const closeBrace = 0x7D;

    var originalPosition = state.pos;
    var originalMax = state.posMax;

    var start = state.pos;
    if (state.src.charCodeAt(start) !== openBrace) {
        return false;
    }

    var firstCode = state.src.charCodeAt(start);
    var secondCode = state.src.charCodeAt(start + 1);
    var thirdCode = state.src.charCodeAt(start + 2);

    var level = 0;
    var indexOfClosingBrace = 0;
    var content = null;

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
    if (indexOfClosingBrace > 0) {

        content = state.src.slice(start + level, indexOfClosingBrace);

        switch (level) {
            case 1:
                var token = state.push('special_term_1_open', '', 1);
                token.markup = '{';

                token = state.push('text', '', 0);
                token.content = content;

                token = state.push('special_term_1_close', '', -1);
                token.markup = '}';
                break;
            case 2:
                var token = state.push('special_term_2_open', '', 1);
                token.markup = '{{';

                token = state.push('text', '', 0);
                token.content = content;

                token = state.push('special_term_2_close', '', -1);
                token.markup = '}}';
                break;
            case 3:
                var token = state.push('special_term_3_open', '', 1);
                token.markup = '{{{';

                token = state.push('text', '', 0);
                token.content = content;

                token = state.push('special_term_3_close', '', -1);
                token.markup = '}}}';
                break;
            default:
                break;
        }

        state.pos = indexOfClosingBrace + level;
        return true;
    }

    return false;
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

// var file = fs.readFileSync("./backtick_tests.md");
// md.use(sub);


var text = file.toString();

// var result = md.render(text);

var result = md.render(text);

console.log(result);