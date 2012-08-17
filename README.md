HTML5 Picture Support
=====================

Adds support for the HTML5 Picture Element with graceful degradation.

Allows you to create Picture tags, similar in format to the video tag, and utilize media queries to display the correct image(s).

```
<picture alt="angry pirate">
  <source src="hires.jpeg" media="(min-width:600px) and (max-width:800px)" />
  <source src="midres.jpeg" media="(min-width:300px) and (max-width:600px)" />
  <source src="lores.jpeg" media="(max-width:300px)" />
  <!-- fallback for browsers without support -->
  <img src="midres.jpeg" alt="angry pirate" />
</picture>
```

Original idea for this format was Bruce Lawson.
http://www.brucelawson.co.uk/2011/notes-on-adaptive-images-yet-again/