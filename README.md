HTML5 Picture Support
=====================

Adds support for the HTML5 Picture Element with graceful degradation.

Allows you to create Picture tags, similar in format to the video tag, and utilize media queries to display the correct image(s).

```
<picture alt="angry pirate">
   <source src=hires.png media="min-width:800px">
   <source src=midres.png media="min-width:480px">
   <source src=lores.png>
      <!-- fallback for browsers without support -->
      <img src=midres.png alt="angry pirate">
</picture>
```

Original idea for this format was Bruce Lawson.
http://www.brucelawson.co.uk/2011/notes-on-adaptive-images-yet-again/