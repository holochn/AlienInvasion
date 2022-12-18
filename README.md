# Alien Invasion
Arcade game Alien Invasion in Javascript with P5.js library

You need to add following script in your *.html file
```
<script src="p5/alien_invaders.js"></script>
<script src="p5/alien.js"></script>
<script src="p5/alien_field.js"></script>
<script src="p5/starship.js"></script>
<script src="p5/starship_bullet.js"></script>
```

Also, add a tag with class p5_div, e.g.
```
<div class="p5_div"></div>
```

Main functions are located in alien_invaders.js.
The starship is defined in starship.js.
Bullets shot by the ship are defined in starship_bullets.js
The alien invaders are defined in alien.js.
They are a set of fields of type AlienField which is defined in 
alien_field.js

Please note that opening the example.html file in a browser will ot work. 
You need to have a websever set up to interpret the file correctly.
