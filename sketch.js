var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft,
    isRight,
    isFalling,
    isPlummeting;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
}

function draw()
{
	background(100,155,255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//game character
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
    
    if(isLeft && gameChar_x >= 40){
        gameChar_x -= 3;
    }
    
    if(isRight && gameChar_x <= 990){
        gameChar_x += 3;
    }

    if(gameChar_y < floorPos_y){
        gameChar_y += 3;
        isFalling = true;
    }
    else{
        isFalling = false;
        gameChar_y = floorPos_y;
    }
}


function keyPressed()
{
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    // A key
    if(keyCode == 65){
        isLeft = true;
    }
    
    // D key
    if(keyCode == 68){
        isRight = true;
    }
    
    // W key or Spacebar
    if((keyCode == 87 || keyCode == 32) && gameChar_y == floorPos_y){
        gameChar_y -= 100;
        isFalling = true;
    }
}

function keyReleased()
{
	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    // A key
    if(keyCode == 65){
        isLeft = false;
    }
    
    // D key
    if(keyCode == 68){
        isRight = false;
    }
}
