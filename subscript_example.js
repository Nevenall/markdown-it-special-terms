// Process ~subscript~

'use strict';

// same as UNESCAPE_MD_RE plus a space
var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;


function subscript(state, silent) {
    var found,
        content,
        token,
        max = state.posMax,
        start = state.pos;

    // only when not embedded, for example, in a header
    if (state.src.charCodeAt(start) !== 0x7E/* ~ */) { return false; }

    if (silent) { return false; } // don't run any pairs in validation mode

    // Skip empty tildes?
    if (start + 2 >= max) { return false; }

    // start at the first non ~ character
    state.pos = start + 1;

    // check for the matching ~?
    while (state.pos < max) {
        if (state.src.charCodeAt(state.pos) === 0x7E/* ~ */) {
            found = true;
            break;
        }

        // there is a match so we skip the token, not sure what that does.
        state.md.inline.skipToken(state);
    }

    // if there's no matching end ~, reset the state.pos, and return.
    if (!found || start + 1 === state.pos) {
        state.pos = start;
        return false;
    }


    content = state.src.slice(start + 1, state.pos);

    // don't allow unescaped spaces/newlines inside
    // check content
    if (content.match(/(^|[^\\])(\\\\)*\s/)) {
        state.pos = start;
        return false;
    }

    // found!
    // the max becomes where we started? 
    state.posMax = state.pos;
    // and advance
    state.pos = start + 1;

    // Earlier we checked !silent, but this implementation does not need it
    // as we push tokens the previous max was one past the end of the src
    // but now it is the upper limit for the content, which is 

// ah, so state.push advances the pos indicator


    token = state.push('sub_open', 'sub', 1);
    token.markup = '~';

    token = state.push('text', '', 0);
    token.content = content.replace(UNESCAPE_RE, '$1');

    token = state.push('sub_close', 'sub', -1);
    token.markup = '~';

// reset because state.push will advance the pos indicator
// doesn't actually, that was a lie.

    state.pos = state.posMax + 1;
    state.posMax = max;
    return true;
}


module.exports = function sub_plugin(md) {
    md.inline.ruler.after('emphasis', 'sub', subscript);
};