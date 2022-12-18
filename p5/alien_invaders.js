var alien;
var starship;
var num_starships=6;
var aliens = []; 
var bullets = [];
var won=false;
var level=1;
var score=0;
var rowdecrement=0;
var maxLevel=10;
var figure;
var col;
    

var fig1 = new Array(
    false, false, true , false, false, false, false, true , false, false, false,
    false, false, false, true , false, false, false, true , false, false, false, 
    false, true , true , false, true , true , true , false, true , true , false, 
    true , true , true , true , true , true , true , true , true , true , true , 
    true , false, true , true , true , true , true , true , true , false, true ,
    true , false, true , false, false, false, false, false, true , false, true ,
    false, false, false, true , true , false, true , true , false, false, false
    );
var fig2 = new Array(
    false, false, false, true , true , true , true , true , false, false, false,
    false, false, true , true , true , true , true , true , true , false, false,
    false, true , true , true , true , true , true , true , true , true , false,
    true , true , true , false, true , true , true , false, true , true , true ,
    true , true , true , true , true , true , true , true , true , true , true ,
    false, false, false, true , false, false, false, true , false, false, false,
    false, false, true , false, true , true , true , false, true , false, false,
    false, true , false, true , false, false, false, true , false, true , false
);
var fig3 = new Array(
    false, false, false, false, true , true , true , false, false, false, false,
    false, false, false, true , true , true , true , true , false, false, false,
    true , true , true , true , true , true , true , true , true , true , true ,
    true , true , true , false, false, true , false, false, true , true , true ,
    true , true , true , true , true , true , true , true , true , true , true ,
    false, false, true , true , false, false, false, true , true , false, false,
    false, true , true , false, true , true , true , false, true , true , false,
    true , true , false, false, false, false, false, false, false, true , true
);
var fig4 = new Array(
    false, false, true , false, false, false, false, true , false, false, false,
    true , false, false, true , false, false, false, true , false, false, true , 
    true , true , true , false, true , true , true , false, true , true , true , 
    true , true , true , true , true , true , true , true , true , true , true , 
    false, false, true , true , true , true , true , true , true , false, false,
    false, false, true , false, false, false, false, false, true , false, false,
    false, false, false, true , true , false, true , true , false, false, false
);
var fig5 = new Array(
    false, false, false, false, false, true , false, false, false, false, false,
    false, false, false, false, true , true , true , false, false, false, false,
    false, false, true , true , true , true , true , true , true , false, false,
    false, true , true , false, true , false, true , false, true , true , false,
    false, true , true , false, true , false, true , false, true , true , false,
    true , true , true , true , true , true , true , true , true , true , true ,
    false, false, true , true , true , false, true , true , true , false, false,
    false, false, false, true , false, false, false, true , false, false, false
);

function getFigure() {
    var fig = floor(random(1,num_starships));
    
    switch(fig) {
        case 1: figure=fig1;
                col = color(0,255,255);
                break;
        case 2: figure=fig2;
                col = color(255,0,255);
                break;
        case 3: figure=fig3;
                col = color(255,0,0);
                break;
        case 4: figure=fig4;
                col = color(0,255,0);
                break;
        default: figure=fig5;
                col = color(255,255,0);
    }
}

function newLevel() {

    var lvl=level;
    var startpos= floor((width-(50*num_starships))/2);
    var strshps = num_starships;

    if(level>1 && (level%2==0)) {
        rowdecrement+=1;
    }

    lvl -= rowdecrement;

    for(let i=0; i<lvl; i++) {
        getFigure();
        for(let r=0; r<num_starships; r++) {
            aliens.push( new Alien(startpos + 50 *r, 80 + 40*i, figure, col ) );
            if(level>1 && (level%2==0)) {
                aliens[r + i*num_starships].accelerate(2);
            }
        }
    }
    console.log(aliens[0].direction);
}

function setup() {
    var myCanvas = createCanvas(700,400);
    myCanvas.parent("p5_div");
    newLevel();
    starship = new Starship(width/2, height);
}

function keyReleased() {
    if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        starship.move(0);
    }
}

function keyPressed() {
    if(keyCode === RIGHT_ARROW) {
        starship.move(1);
    } else if(keyCode === LEFT_ARROW) {
        starship.move(-1);
    } else if(key === " ") {
        var b = new StarshipBullet(starship.x, starship.y);
        bullets.push(b);
    }
}

function updateBullets() {
    for(let i=bullets.length-1; i>=0; i--) {
        if(bullets[i].getY() < 0) {
            bullets.splice(i, 1);
        }
    }
}

function draw() {
    background(0);
    updateBullets();

    text("Aliens left: ", width-90, 20);
    text(aliens.length, width-30, 20);
    text("Level: ", 10, 20);
    text(level, 45, 20);
    text("Score: ", 100, 20);
    text(score, 145, 20);

    if(won==true) {
        stroke(255,0,0);
        fill(255,255,127);
        rect((width/2)-100, 200, 200, 100);
        textSize(30);
        fill(0);
        text(" YOU WON! ", (width/2)-90, 230);
        noLoop();
    }

    for(i=0; i<aliens.length; i++) {
        aliens[i].update();
        aliens[i].show();
    }
    
    starship.update();
    starship.show(width/2, height);

    for(let i=bullets.length-1; i>=0; i--) {
        for(let j=0; j<aliens.length; j++) {
            if(bullets[i].hit(aliens[j])) {
                 aliens[j].explode(bullets[i]);
                 bullets.splice(i,1);
                 score++;
                 break;
            }
        }
    }

    for(let j=aliens.length-1; j>=0; j--) {
        if(aliens[j].existing() == false) {
            aliens.splice(j,1);
        }
    }

    for(let i=0; i<bullets.length; i++) {
        bullets[i].update();
        bullets[i].show();
    }

    if( aliens.length > 0) {
        if( aliens[aliens.length-1].getY() >= height-aliens[aliens.length-1].getHeight() ) {
            stroke(255,0,0);
            fill(255,255,127);
            rect((width/2)-100, 200, 200, 100);
            textSize(30);
            fill(0);
            text("GAME OVER", (width/2)-90, 230);
            noLoop();
        }
    } else {
        if(level < maxLevel) {
            level++;
            newLevel();
        } else {
            won = true;
        }
    }
}
