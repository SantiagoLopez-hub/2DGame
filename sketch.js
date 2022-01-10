var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft,
    isRight,
    isFalling,
    isPlummeting;

var collectable,
    canyon;

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
    
    canyon = {
        x_pos: 100,
        width: 100
    };
    
    collectable = {
        x_pos: 300,
        y_pos: 0,
        size: 50,
        primaryColour: [115, 50, 12],
        secondaryColour: [133, 82, 0],
        isFound: false
    };
}

function draw()
{
	background(100,155,255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    if(gameChar_x >= (canyon.x_pos + 70) && gameChar_x <= (canyon.x_pos + 70 + canyon.width)
       && 
       gameChar_y >= floorPos_y){
        isPlummeting = true;
    }
    else{
        isPlummeting = false;
    }
    
    if(isPlummeting){
        gameChar_y += 5;
    }
   
    //Canyon
    fill(50, 10, 0);
    rect(canyon.x_pos + 70, 432, canyon.width, 144);
    
    beginShape(); // Water effect
    fill(48, 140, 161);
    vertex(canyon.x_pos + 170, 460);
    vertex(canyon.x_pos + 120, 470);
    vertex(canyon.x_pos + 140, 485);
    vertex(canyon.x_pos + 70, 520);
    
    vertex(canyon.x_pos + 70, 576);
    vertex(canyon.x_pos + 130, 576);
    
    vertex(canyon.x_pos + 170, 510);
    vertex(canyon.x_pos + 170, 485);
    vertex(canyon.x_pos + 150, 475);
    vertex(canyon.x_pos + 150, 475);
    vertex(canyon.x_pos + 170, 470);
    endShape(CLOSE);

    
    if(dist(gameChar_x, gameChar_y, collectable.x_pos + 500, collectable.y_pos + 400) <= 65){
        collectable.isFound = true;
    }
    
    if(!collectable.isFound){
        //Bear
        //Outlining bear structure for ease of visualisation
        stroke(0);

        //Arms
        fill(115, 50, 12);

        push(); //Left arm
        translate(collectable.x_pos + 525, collectable.y_pos + 390);
        rotate(0.5);
        ellipse(0, 0, 35, 20);
        pop();

        push(); //Right arm
        translate(collectable.x_pos + 475, collectable.y_pos + 390);
        rotate(-0.5);
        ellipse(0, 0, 35, 20);
        pop();

        //Body
        fill(115, 50, 12);
        ellipse(collectable.x_pos + 500,
                collectable.y_pos + 400,
                collectable.size - (collectable.size / 5),
                collectable.size);

        //Legs
        fill(collectable.secondaryColour);
        //Left leg
        ellipse(collectable.x_pos + 485, collectable.y_pos + 410, 20, 27);
        //Right leg
        ellipse(collectable.x_pos + 515, collectable.y_pos + 410, 20, 27);

        //Head
        ellipse(collectable.x_pos + 485, collectable.y_pos + 360, 17); //Left ear
        ellipse(collectable.x_pos + 515, collectable.y_pos + 360, 17); //Right ear

        fill(200);
        ellipse(collectable.x_pos + 485, collectable.y_pos + 360, 10); //Left ear inside
        ellipse(collectable.x_pos + 515, collectable.y_pos + 360, 10); //Right ear inside

        fill(collectable.primaryColour);
        ellipse(collectable.x_pos + 500, collectable.y_pos + 370, 36); //Face

        fill(collectable.secondaryColour);
        ellipse(collectable.x_pos + 500, collectable.y_pos + 378, 23, 18); //Snout

        fill(0);
        ellipse(collectable.x_pos + 493, collectable.y_pos + 365, 5); //Left eye
        ellipse(collectable.x_pos + 507, collectable.y_pos + 365, 5); //Right eye
        triangle(collectable.x_pos + 500, collectable.y_pos + 379, collectable.x_pos + 504, collectable.y_pos + 375, collectable.x_pos + 496, collectable.y_pos + 375); //Nose
        line(collectable.x_pos + 499.5, collectable.y_pos + 382, collectable.x_pos + 499.5, collectable.y_pos + 375);

        beginShape();
        noFill();
        vertex(collectable.x_pos + 494, collectable.y_pos + 382);
        vertex(collectable.x_pos + 496, collectable.y_pos + 383);
        vertex(collectable.x_pos + 499, collectable.y_pos + 383);

        vertex(collectable.x_pos + 502, collectable.y_pos + 383);
        vertex(collectable.x_pos + 505, collectable.y_pos + 383);
        vertex(collectable.x_pos + 506, collectable.y_pos + 382);
        endShape();
    }

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
        gameChar_y += 4;
        isFalling = true;
    }
    else{
        isFalling = false;
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
