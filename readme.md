# Special Terms Plugin

  Have a word or phrase in your markdown you'd like to wrap with custom styling?

  This Markdown-it plugin allows you provide custom html for rendering text wrapped in {curly braces}.
  
  The default is html is a `<span class="special-term-1">` element.

## Usage

``` javascript
var MarkdownIt = require('markdown-it');
var specialterms = require('markdown-it-special-terms')

var md = new MarkdownIt();

md.use(specialterms);

md.render(`# This is a header containing a {special term}

{Level 1 Special Term}

{{Level 2 Special Term}}

{{{Level 3 Special Term}}}`);

```

renders as:

``` html
<h1>This is a header containing a <span class='special-term-1'>special term</span></h1>
<p><span class='special-term-1'>Level 1 Special Term</span></p>
<p><span class='special-term-2'>Level 2 Special Term</span></p>
<p><span class='special-term-3'>Level 3 Special Term</span></p>
```

## Options

The options object allows you to specify custom opening and closing tags. 

``` javascript
md.use(specialterms, {
   open_1: "<span class='game-term'>",
   close_1: "</span>",
   open_2: "<aside class='callout'>",
   close_2: "</aside>",
   open_3: "<div class='stat-block'>",
   close_3: "</div>"
});
```

## Future Improvements

Allow the rendering of {} within a {{}} or {{{}}} block.
