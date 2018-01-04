# this is a markdown doc

  it's basic purpose is to contain text that we test for new rules.
  For example, I would like to be able to create some special rules for particular words or phrases.
  Maybe I might call out a {Game Term} and have that automagically made small caps. Or red, or at least bolded.
  It's some symantic markup for my particular domain of game text.

## So what are some ideas?

  I have two thoughts acutally:

  1. Any word or phrase in ALL CAPS gets wrapped in a <span class="small-caps">ALL CAPS</span> which gives us the option to define a small caps style.
  1. or...we use one or more {game term} to indicate symantic meaning for game terms. First level game term. {{Second level game term}} not sure what that would mean, but you get the idea.

  Either way is readable. The first might be more appropriate to the spirit of markdown.

  The trick is, the first way might not be that easy in a markdown-it plugin.

  I guess linkify works, so why wouldn't smallcaps?

  The second way, we could do things like provide the ability to specify the markup to use for these special terms. You might wrap them in a span with a special-term-01 class, or special-term-02. then you can style it however the heck you want to.
