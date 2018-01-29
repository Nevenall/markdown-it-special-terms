# Special Terms Plugin

  Have a word or phrase in your markdown you'd like to wrap with custom styling?

  This Markdown-it plugin allows text wrapped in {curly braces} to be rendered in a `<span class="special-term-1">` element.

## Usage

  Wrap text in one, two, or three curly braces to render that text in a `<span>`.

``` markdown

# This is a header containing a {special term}

{Level 1 Special Term}

{{Level 2 Special Term}}

{{{Level 3 Special Term}}}

```

renders as:

``` html
<h1>This is a header containing a <span class='special-term-1'>special term</span></h1>
<p><span class='special-term-1'>Level 1 Special Term</span></p>
<p><span class='special-term-2'>Level 2 Special Term</span></p>
<p><span class='special-term-3'>Level 3 Special Term</span></p>

```

## Future Plans

In the future you will be able to specify the exact html for each level of special term.
