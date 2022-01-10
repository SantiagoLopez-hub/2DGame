var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var game_score;
var flagpole;
var lives;
var spikes_x;
var spikes = [];

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x = [],
    clouds = [],
    mountains = [],
    canyons,
    collectables;

var weather,
    temperature;
var rain = [],
    snow = [];

var backgroundSound,
    jumpSound,
    scoreUpSound,
    gameOverSound,
    gameWonSound;

function preload()
{
    soundFormats("mp3");

    // The following will only load on a server,
    //using brackets' "Live Preview" works, else it crashes
    jumpSound = loadSound("assets/char_jump.mp3");
    scoreUpSound = loadSound("assets/score_up.mp3");
    gameOverSound = loadSound("assets/game_over.mp3");
    gameWonSound = loadSound("assets/game_won.mp3");

    // Using "playBackgroundSound" as a callback function, it will only
    //execute once the file has loaded
    backgroundSound = loadSound("assets/background_music.mp3", playBackgroundSound);
}

function playBackgroundSound()
{
    backgroundSound.setVolume(0.75);
    backgroundSound.loop();
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    weather = floor(random(0, 3));
    lives = 4;

    startGame();
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

    push(); // Allows for movement throughout the scene
    translate(scrollPos, 0);
    
	// Draw clouds
    drawClouds();

	// Draw mountains
    drawMountains();

	// Draw trees
    drawTrees();

    //Draw flagpole
    renderFlagpole();

	// Draw canyons
    for(var n = 0; n < canyons.length; n++)
    {
        drawCanyon(canyons[n]);
        checkCanyon(canyons[n]);
    }

	// Draw collectable items
    for(var a = 0; a < collectables.length; a++)
    {
        
        if(!collectables[a].isFound)
        {
            drawCollectable(collectables[a]);
            checkCollectable(collectables[a]);
        }
    }

    // Draw enemies
    drawSpikes();

    for(var s = 0; s < spikes_x.length; s++){
        spikes[s].checkSpike();
    }

    pop(); // Supports the movement throughout the scene
    
    // Draw current lives
    fill(255);
    strokeWeight(3);
    stroke(0);
    textSize(15);
    text("Your current lives:", 20, 40);

    noStroke();
    fill(150, 0, 0);
    for(var i = 0; i < lives; i++)
    {
        triangle(
                150 + (i*50), 20,
                170 + (i*50), 50,
                190 + (i*50), 20
            );
    }

    getCurrentScore();
    strokeWeight(1);
    
    // Creates weather
    createWeather();

	// Draw game character
	drawGameChar();

    if(!flagpole.isReached)
    {
        checkFlagpole();
    }

    if(lives < 1)
    {
        document.getElementById("GameOverText").style.display = "block";
        return;
    }
    if(flagpole.isReached)
    {
        backgroundSound.stop();
        document.getElementById("GameWon").style.display = "block";
        return;
    }

	// Logic to make the game character move or the background scroll
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Update real position of gameChar for collision detection
	gameChar_world_x = gameChar_x - scrollPos;

    // Check if character is below ground
    if(gameChar_y > floorPos_y & lives > 0)
    {
        startGame();
    }
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{
    console.log(keyCode)
    // A key
    if(keyCode == 65 || keyCode == 37)
    {
        isLeft = true; // Moves left
    }
    
    // D key
    if(keyCode == 68 || keyCode == 39)
    {
        isRight = true; // Moves right
    }
    
    // W key or Spacebar
    if((keyCode == 87 || keyCode == 38) && gameChar_y == floorPos_y)
    {
        gameChar_y -= 120; // Jumps
        isFalling = true;
        jumpSound.play();
    }
}

function keyReleased()
{    
    // A key
    if(keyCode == 65 || keyCode == 37)
    {
        isLeft = false; // Stops moving left
    }
    
    // D key
    if(keyCode == 68 || keyCode == 39)
    {
        isRight = false; // Stops moving right
    }
}


// ------------------------------
// Game character render function
// ------------------------------
function drawGameChar()
{
	// draw game character
	if(isLeft && isFalling)
	{
		// jumping-left code
        fill(232, 232, 232);
        stroke(0);
        rect(gameChar_x - 15, gameChar_y - 57, 30, 50, 3); // Body

        rect(gameChar_x - 13, gameChar_y - 7, 7, 3); // Left leg
        rect(gameChar_x + 6, gameChar_y - 7, 7, 5); // Right leg

        rect(gameChar_x - 20, gameChar_y - 32, 5, -10); // Left arm
        rect(gameChar_x - 25, gameChar_y - 42, 5, -18); // Left arm

        rect(gameChar_x + 15, gameChar_y - 37, 5, -5); // Right arm
        rect(gameChar_x + 10, gameChar_y - 42, 5, -18); // Right arm

        fill(175, 175, 175);
        ellipse(gameChar_x - 2, gameChar_y - 42, 5, 7); // Mouth
        fill(0);
        ellipse(gameChar_x - 11, gameChar_y - 49, 2, 3); // Left eye
        ellipse(gameChar_x + 5, gameChar_y - 49, 2, 3); // Right eye

        fill(179, 167, 0);
        ellipse(gameChar_x, gameChar_y - 67, 25, 5); // Outter Halo
        fill(255);
        ellipse(gameChar_x, gameChar_y - 67, 20, 5); // Inner Halo

        noStroke();
        fill(255);
        ellipse(gameChar_x - 10, gameChar_y - 22, 3, 15); // Reflection

	}
	else if(isRight && isFalling)
	{
		// jumping-right code
        fill(232, 232, 232);
        stroke(0);
        rect(gameChar_x - 15, gameChar_y - 57, 30, 50, 3); // Body

        rect(gameChar_x - 13, gameChar_y - 7, 7, 5); // Left leg
        rect(gameChar_x + 6, gameChar_y - 7, 7, 3); // Right leg

        rect(gameChar_x - 20, gameChar_y - 37, 5, -5); // Left arm
        rect(gameChar_x - 15, gameChar_y - 42, 5, -18); // Left arm

        rect(gameChar_x + 15, gameChar_y - 32, 5, -10); // Right arm
        rect(gameChar_x + 20, gameChar_y - 42, 5, -18); // Right arm

        fill(175, 175, 175);
        ellipse(gameChar_x + 2, gameChar_y - 42, 5, 7); // Mouth
        fill(0);
        ellipse(gameChar_x - 5, gameChar_y - 49, 2, 3); // Left eye
        ellipse(gameChar_x + 11, gameChar_y - 49, 2, 3); // Right eye

        fill(179, 167, 0);
        ellipse(gameChar_x, gameChar_y - 67, 25, 5); // Outter Halo
        fill(255);
        ellipse(gameChar_x, gameChar_y - 67, 20, 5); // Inner Halo

        noStroke();
        fill(255);
        ellipse(gameChar_x + 10, gameChar_y - 22, 3, 15); // Reflection

	}
	else if(isLeft)
	{
		// walking left code
        fill(232, 232, 232);
        stroke(0);
        rect(gameChar_x - 15, gameChar_y - 57, 30, 50, 3); // Body

        rect(gameChar_x - 13, gameChar_y - 7, 7, 3); // Left leg
        rect(gameChar_x + 6, gameChar_y - 7, 7, 5); // Right leg

        rect(gameChar_x - 20, gameChar_y - 32, 5, 10); // Left arm
        rect(gameChar_x - 25, gameChar_y - 22, 5, 10); // Left arm

        rect(gameChar_x + 15, gameChar_y - 32, 5, 5); // Right arm
        rect(gameChar_x + 10, gameChar_y - 27, 5, 5); // Right arm
        rect(gameChar_x + 5, gameChar_y - 22, 5, 10); // Right arm

        line(gameChar_x - 5, gameChar_y - 42, gameChar_x + 2, gameChar_y - 42); // Mouth
        ellipse(gameChar_x - 11, gameChar_y - 49, 1, 3); // Left eye
        ellipse(gameChar_x + 5, gameChar_y - 49, 1, 3); // Right eye

        noStroke();
        fill(255);
        ellipse(gameChar_x - 10, gameChar_y - 22, 3, 15); // Reflection

	}
	else if(isRight)
	{
		// walking right code
        fill(232, 232, 232);
        stroke(0);
        rect(gameChar_x - 15, gameChar_y - 57, 30, 50, 3); // Body

        rect(gameChar_x - 13, gameChar_y - 7, 7, 5); // Left leg
        rect(gameChar_x + 6, gameChar_y - 7, 7, 3); // Right leg

        rect(gameChar_x - 20, gameChar_y - 32, 5, 10); // Left arm
        rect(gameChar_x - 15, gameChar_y - 22, 5, 5); // Left arm
        rect(gameChar_x - 10, gameChar_y - 17, 5, 5); // Left arm

        rect(gameChar_x + 15, gameChar_y - 32, 5, 10); // Right arm
        rect(gameChar_x + 20, gameChar_y - 22, 5, 10); // Right arm

        line(gameChar_x - 2, gameChar_y - 42, gameChar_x + 5, gameChar_y - 42); // Mouth
        ellipse(gameChar_x - 5, gameChar_y - 49, 1, 3); // Left eye
        ellipse(gameChar_x + 11, gameChar_y - 49, 1, 3); // Right eye

        noStroke();
        fill(255);
        ellipse(gameChar_x + 10, gameChar_y - 22, 3, 15); // Reflection

	}
	else if(isFalling || isPlummeting)
	{
		// jumping facing forwards code
        fill(232, 232, 232);
        stroke(0);
        rect(gameChar_x - 15, gameChar_y - 57, 30, 50, 3); // Body

        rect(gameChar_x - 13, gameChar_y - 7, 7, 5); // Left leg
        rect(gameChar_x + 6, gameChar_y - 7, 7, 5); // Right leg

        rect(gameChar_x - 20, gameChar_y - 32, 5, -28); // Left arm
        rect(gameChar_x + 15, gameChar_y - 32, 5, -28); // Right arm

        fill(175, 175, 175);
        ellipse(gameChar_x, gameChar_y - 42, 5, 7); // Mouth
        fill(0);
        ellipse(gameChar_x - 8, gameChar_y - 49, 2, 3); // Left eye
        ellipse(gameChar_x + 8, gameChar_y - 49, 2, 3); // Right eye

        fill(179, 167, 0);
        ellipse(gameChar_x, gameChar_y - 67, 25, 5); // Outter Halo
        fill(255);
        ellipse(gameChar_x, gameChar_y - 67, 20, 5); // Inner Halo

	}
	else
	{
		// standing front facing code
        fill(232, 232, 232);
        stroke(0);
        rect(gameChar_x - 15, gameChar_y - 57, 30, 50, 3); // Body

        rect(gameChar_x - 13, gameChar_y - 7, 7, 5); // Left leg
        rect(gameChar_x + 6, gameChar_y - 7, 7, 5); // Right leg

        rect(gameChar_x - 20, gameChar_y - 32, 5, 20); // Left arm
        rect(gameChar_x + 15, gameChar_y - 32, 5, 20); // Right arm

        line(gameChar_x - 5, gameChar_y - 42, gameChar_x + 5, gameChar_y - 42); // Mouth
        ellipse(gameChar_x - 8, gameChar_y - 49, 1, 3); // Left eye
        ellipse(gameChar_x + 8, gameChar_y - 49, 1, 3); // Right eye
	}
    
    // Interaction code
    if(gameChar_y < floorPos_y)
    {
        gameChar_y += 4;
        isFalling = true;
    }
    else
    {
        isFalling = false;
    }

}

// ---------------------------
// Background render functions
// ---------------------------
function drawClouds()
{
    for(var j = 0; j < clouds.length; j++)
    {
        // Draws clouds from the "Cloud" class
        new Cloud(clouds[j].pos_x);
    }
}

function drawMountains()
{
    for(var k = 0; k < mountains.length; k++)
    {
        // Draws mountains from the "Mountain" class
        new Mountain(mountains[k].pos_x_offset);
    }
}

function drawTrees()
{
    for(var i = 0; i < trees_x.length; i++)
    {
        // Draws trees from the "Tree" class
        new Tree(trees_x[i], floorPos_y);
    }
}

function drawSpikes(){
    for(var e = 0; e < spikes_x.length; e++){
        new Spike(spikes_x[e]);
    }
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------
function drawCanyon(t_canyon)
{
    // Draws canyons
    new Canyon(t_canyon.pos_x, t_canyon.width);
}


// check character is over a canyon
function checkCanyon(t_canyon)
{
    if(gameChar_world_x >= (t_canyon.pos_x + 70) 
       && 
       gameChar_world_x <= (t_canyon.pos_x + 70 + t_canyon.width)
       && 
       gameChar_y >= floorPos_y)
    {
        isPlummeting = true;
    }
    else
    {
        isPlummeting = false;
    }
    
    if(isPlummeting)
    {
        gameChar_y += 15;
        isGameOver = true;
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// draw collectable objects
function drawCollectable(t_collectable)
{
    new Collectable(t_collectable)
}

// check character has collected an item
function checkCollectable(t_collectable)
{
    // Calculate the distance between the collectable and the character
    var distance = dist(gameChar_world_x, gameChar_y, t_collectable.pos_x + 500, t_collectable.pos_y + 400);
    
    if(distance <= 65)
    {
        t_collectable.isFound = true;
        scoreUpSound.play();
    }
}

function getCurrentScore()
{
    game_score = 0;
    for(var i = 0; i < collectables.length; i++)
    {
        if(collectables[i].isFound)
        {
            game_score++;
        }
    }
    
    fill(255);
    stroke(0);
    textSize(15);
    text('Your current score: ' + game_score, 20, 80);
}

function renderFlagpole()
{
    if(flagpole.isReached)
    {
        noStroke();
        fill(40, 150, 10);

        rect(flagpole.x_pos,
            floorPos_y - flagpole.size,
            25,
            flagpole.size);

        fill(60, 200, 150);
        triangle(flagpole.x_pos,
                floorPos_y - flagpole.size,
                flagpole.x_pos + 25,
                floorPos_y - (flagpole.size - (flagpole.size / 3)),
                flagpole.x_pos + 175,
                floorPos_y - (flagpole.size - (flagpole.size / 5)));
    }
    else
    {
        noStroke();
        fill(230, 20, 10);

        rect(flagpole.x_pos,
            floorPos_y - flagpole.size,
            25,
            flagpole.size);

        fill(255);
        triangle(flagpole.x_pos,
                floorPos_y - flagpole.size,
                flagpole.x_pos + 25,
                floorPos_y - (flagpole.size - (flagpole.size / 3)),
                flagpole.x_pos + 175,
                floorPos_y - (flagpole.size - (flagpole.size / 5)));
    }
}

function checkFlagpole()
{
    if(abs(gameChar_world_x - flagpole.x_pos) <= 50)
    {
        flagpole.isReached = true;
        gameWonSound.play();
    }
}

function createWeather()
{
    strokeWeight(3);
    text("Current temperature:", 20, 120);
    
    switch(weather)
    {
        case 0:
            // Normal weather
            temperature = 40 + "°";
            text(temperature, 170, 120);

            fill(250, 232, 72);
            noStroke();

            ellipse(900 + scrollPos, 50, 80);
            break;
        case 1:
            // Rain
            createRain();
            break;
        case 2:
            // Snow
            createSnow();
            break;
    }

    strokeWeight(1);
}

function createRain()
{
    temperature = 10 + "°";
    text(temperature, 170, 120);

    for(var i = rain.length-1; i >= 0; i--)
    {
        rain[i].draw();
        rain[i].move();

        if(rain[i].y >= floorPos_y - rain[i].height)
        {
            rain.splice(i, 1);

            rain.push(
                new Rain(
                    random(0, width),
                    -25
                )
            );
        }
    }
}

function createSnow()
{
    temperature = -5 + "°";
    text(temperature, 170, 120);

    for(var i = snow.length-1; i >= 0; i--)
    {
        snow[i].draw();
        snow[i].move();

        if(snow[i].y >= floorPos_y - snow[i].width/2)
        {
            snow.splice(i, 1);

            snow.push(
                new Snow(
                    random(10, 20),
                    random(0, width),
                    -10
                )
            );
        }
    }
}

function startGame()
{
    trees_x = [];
    clouds = [];
    mountains = [];
    rain = [];
    snow = [];

    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    flagpole = {
        x_pos: -5000,
        isReached: false,
        size: 300
    };
    
    // Variable to control the background scrolling
    scrollPos = 0;

    // store position of the character needed for collision detection
    gameChar_world_x = gameChar_x - scrollPos;

    // Boolean variables to control the movement of the game character
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    // Initialise arrays of scenery objects
    for(var g = 0; g < 40; g++)
    {
        trees_x.push(random(-5000, 5000));
    }

    for(var g = 0; g < 30; g++)
    {
        clouds.push(
            {
                pos_x: random(-5000, 5000)
            }
        );
    }
    
    // offset based on the center of the x axis
    for(var g = 0; g < 25; g++)
    {
        mountains.push(
            {
                pos_x_offset: random(-4000, 3000)
            }
        );
    }

    // Rain
    for(var i = 0; i < 50; i++)
    {
        rain.push(new Rain(random(0, width), random(0, height)));
    }
    // Snow
    for(var i = 0; i < 50; i++)
    {
        snow.push(new Snow(random(10, 20), random(0, width), random(0, height)));
    }
    
    // The remaining are fixed as it could influence gameplay
    spikes_x = [-4900, -3500, -3000, -2500, -2000, -1850, -1000, 0, 770, 1500, 3000, 4000, 4500];

    canyons = [
        {
            pos_x: -500,
            width: 100
        },
        {
            pos_x: -800,
            width: 100
        },
        {
            pos_x: -1000,
            width: 100
        },
        {
            pos_x: -1800,
            width: 100
        },
        {
            pos_x: -2900,
            width: 100
        },
        {
            pos_x: -3400,
            width: 100
        },
        {
            pos_x: -4900,
            width: 100
        },
        {
            pos_x: 100,
            width: 100
        },
        {
            pos_x: 500,
            width: 100
        },
        {
            pos_x: 800,
            width: 100
        },
        {
            pos_x: 1000,
            width: 100
        },
        {
            pos_x: 1800,
            width: 100
        },
        {
            pos_x: 1500,
            width: 100
        },
        {
            pos_x: 2000,
            width: 100
        },
        {
            pos_x: 2500,
            width: 100
        },
        {
            pos_x: 3400,
            width: 100
        }
    ];
    
    collectables = [
        {
            pos_x: -350,
            pos_y: 0,
            size: 50,
            primary_colour: [115, 50, 12],
            secondary_colour: [133, 82, 0]
        },
        {
            pos_x: -800,
            pos_y: 0,
            size: 50,
            primary_colour: [115, 50, 12],
            secondary_colour: [133, 82, 0]
        },
        {
            pos_x: -1000,
            pos_y: 0,
            size: 50,
            primary_colour: [115, 50, 12],
            secondary_colour: [133, 82, 0]
        },
        {
            pos_x: -3000,
            pos_y: 0,
            size: 50,
            primary_colour: [115, 50, 12],
            secondary_colour: [133, 82, 0]
        },
        {
            pos_x: -4100,
            pos_y: 0,
            size: 50,
            primary_colour: [115, 50, 12],
            secondary_colour: [133, 82, 0]
        },
        {
            pos_x: -5200,
            pos_y: 0,
            size: 50,
            primary_colour: [115, 50, 12],
            secondary_colour: [133, 82, 0]
        },
        {
            pos_x: 200,
            pos_y: 0,
            size: 50,
            primary_colour: [115, 50, 12],
            secondary_colour: [133, 82, 0]
        },
        {
            pos_x: 1100,
            pos_y: 0,
            size: 50,
            primary_colour: [115, 50, 12],
            secondary_colour: [133, 82, 0]
        },
        {
            pos_x: 3000,
            pos_y: 0,
            size: 50,
            primary_colour: [115, 50, 12],
            secondary_colour: [133, 82, 0]
        },
        {
            pos_x: 3500,
            pos_y: 0,
            size: 50,
            primary_colour: [115, 50, 12],
            secondary_colour: [133, 82, 0]
        }
    ];

    lives--;
    
    if(lives < 3){
        gameOverSound.play();
    }

    if(lives <= 0){
        backgroundSound.rate(0.6);
    }
}

// Class that generates enemies
class Spike
{
    constructor(x)
    {
        spikes.push(this);
        this.x = x;
        this.buildSpike();
    }

    buildSpike()
    {
        fill(255, 0, 0);
        push();
        translate(this.x, floorPos_y);

        triangle(-20, -25,
                -10, 0,
                -30, 0);
        triangle(0, -25,
                -10, 0,
                10, 0);
        triangle(20, -25,
                10, 0,
                30, 0);

        pop();
    }

    checkSpike()
    {
        if(abs(gameChar_world_x - this.x) <= 45
            &&
            gameChar_y > floorPos_y - 25)
        {
            startGame();
        }
    }
}

// Class that generates Clouds
class Cloud
{
    constructor(offset)
    {
        this.buildCloud(offset);
    }

    buildCloud(offset)
    {
        fill(255, 255, 255);
        ellipse(100 + offset, 100, 50, 50);
        ellipse(115 + offset, 80, 60, 50);
        ellipse(140 + offset, 70, 50, 50);
        ellipse(170 + offset, 65, 40, 50);
        ellipse(210 + offset, 80, 60, 50);

        ellipse(210 + offset, 100, 50, 50);
        ellipse(200 + offset, 120, 50, 50);
        ellipse(160 + offset, 125, 50, 50);
        ellipse(120 + offset, 125, 50, 50);

        ellipse(150 + offset, 100, 120, 50);
    }
}

// Class that generates Mountains
class Mountain
{
    constructor(offset)
    {
        this.buildMountain(offset);
    }
    
    buildMountain(offset)
    {
        fill(102, 51, 0);
        triangle(450 + offset, 432, (((450 + offset) + (600 + offset)) / 2), 100, 600 + offset, 432);

        fill(133, 66, 0);
        triangle(490 + offset, 432, (((450 + offset) + (600 + offset)) / 2), 100, 600 + offset, 432);

        fill(224, 224, 224);
        triangle(502 + offset, 200, (((450 + offset) + (600 + offset)) / 2), 100, 550 + offset, 210);
    }
}

// Class that generates Trees
class Tree
{
    constructor(trees_x, floorPos_y)
    {
        this.buildTree(trees_x, floorPos_y);
    }
    
    buildTree(trees_x, floorPos_y)
    {
        // Tree trunk
        noStroke();
        fill(84, 56, 0);
        beginShape();
        vertex(trees_x + 25, floorPos_y - 62);
        vertex(trees_x + 25, floorPos_y - 32);
        vertex(trees_x + 40, floorPos_y);
        vertex(trees_x - 35, floorPos_y);
        vertex(trees_x - 25, floorPos_y - 82);
        vertex(trees_x - 25, floorPos_y - 82);
        endShape(CLOSE);

        // Tree branches
        fill(21, 115, 0);
        ellipse(trees_x - 5, floorPos_y - 132, 90, 80);
        ellipse(trees_x - 25, floorPos_y - 82, 90, 80);
        ellipse(trees_x - 75, floorPos_y - 132, 90, 80);
        ellipse(trees_x - 25, floorPos_y - 182, 75, 90);
        ellipse(trees_x + 25, floorPos_y - 172, 100, 100);
        ellipse(trees_x + 75, floorPos_y - 142, 90, 70);
        ellipse(trees_x + 75, floorPos_y - 102, 100, 80);
        ellipse(trees_x + 25, floorPos_y - 82, 80, 60);
    }
}

// Class that generates Canyons
class Canyon
{
    constructor(pos_x, width)
    {
        this.buildCanyon(pos_x, width);
    }
    
    buildCanyon(pos_x, width)
    {
        fill(50, 10, 0);
        rect(pos_x + 70, 432, width, 144);

        beginShape(); // Water effect
        fill(48, 140, 161);
        vertex(pos_x + 170, 460);
        vertex(pos_x + 120, 470);
        vertex(pos_x + 140, 485);
        vertex(pos_x + 70, 520);

        vertex(pos_x + 70, 576);
        vertex(pos_x + 130, 576);

        vertex(pos_x + 170, 510);
        vertex(pos_x + 170, 485);
        vertex(pos_x + 150, 475);
        vertex(pos_x + 150, 475);
        vertex(pos_x + 170, 470);
        endShape(CLOSE);
    }
}

// Class that generates Collectables
class Collectable
{
    constructor(t_collectable)
    {
        this.buildCollectable(t_collectable);
    }
    
    buildCollectable(t_collectable)
    {
        //Outlining bear structure for ease of visualisation
        stroke(0);

        //Arms
        fill(115, 50, 12);

        push(); //Left arm
        translate(t_collectable.pos_x + 525, t_collectable.pos_y + 390);
        rotate(0.5);
        ellipse(0, 0, 35, 20);
        pop();

        push(); //Right arm
        translate(t_collectable.pos_x + 475, t_collectable.pos_y + 390);
        rotate(-0.5);
        ellipse(0, 0, 35, 20);
        pop();

        //Body
        fill(115, 50, 12);
        ellipse(t_collectable.pos_x + 500,
                t_collectable.pos_y + 400,
                t_collectable.size - (t_collectable.size / 5),
                t_collectable.size);

        //Legs
        fill(t_collectable.secondary_colour);
        //Left leg
        ellipse(t_collectable.pos_x + 485, t_collectable.pos_y + 410, 20, 27);
        //Right leg
        ellipse(t_collectable.pos_x + 515, t_collectable.pos_y + 410, 20, 27);

        //Head
        ellipse(t_collectable.pos_x + 485, t_collectable.pos_y + 360, 17); //Left ear
        ellipse(t_collectable.pos_x + 515, t_collectable.pos_y + 360, 17); //Right ear

        fill(200);
        ellipse(t_collectable.pos_x + 485, t_collectable.pos_y + 360, 10); //Left ear inside
        ellipse(t_collectable.pos_x + 515, t_collectable.pos_y + 360, 10); //Right ear inside

        fill(t_collectable.primary_colour);
        ellipse(t_collectable.pos_x + 500, t_collectable.pos_y + 370, 36); //Face

        fill(t_collectable.secondary_colour);
        ellipse(t_collectable.pos_x + 500, t_collectable.pos_y + 378, 23, 18); //Snout

        fill(0);
        ellipse(t_collectable.pos_x + 493, t_collectable.pos_y + 365, 5); //Left eye
        ellipse(t_collectable.pos_x + 507, t_collectable.pos_y + 365, 5); //Right eye
        triangle(t_collectable.pos_x + 500, 
                 t_collectable.pos_y + 379, 
                 t_collectable.pos_x + 504, 
                 t_collectable.pos_y + 375, 
                 t_collectable.pos_x + 496, 
                 t_collectable.pos_y + 375); //Nose

        line(t_collectable.pos_x + 499.5, 
             t_collectable.pos_y + 382, 
             t_collectable.pos_x + 499.5, 
             t_collectable.pos_y + 375);

        beginShape();
        noFill();
        vertex(t_collectable.pos_x + 494, t_collectable.pos_y + 382);
        vertex(t_collectable.pos_x + 496, t_collectable.pos_y + 383);
        vertex(t_collectable.pos_x + 499, t_collectable.pos_y + 383);

        vertex(t_collectable.pos_x + 502, t_collectable.pos_y + 383);
        vertex(t_collectable.pos_x + 505, t_collectable.pos_y + 383);
        vertex(t_collectable.pos_x + 506, t_collectable.pos_y + 382);
        endShape();
    }
}

function Rain(x, y)
{
    this.height = 25;
    this.x = x;
    this.y = y;

    this.draw = function()
    {
        noStroke();
        fill(50, 100, 255, 100);

        push();
        translate(this.x, this.y);

        triangle(0, this.height,
                -3, 0,
                3, 0);

        pop();
    }
    this.move = function()
    {
        this.y += 4;
    }
}

function Snow(width, x, y)
{
    this.width = width;
    this.x = x;
    this.y = y;

    this.draw = function()
    {
        noStroke();
        fill(255, 255, 255, 200);

        ellipse(this.x, this.y, this.width);
    }
    this.move = function()
    {
        this.y += 2;
    }
}