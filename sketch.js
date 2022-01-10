var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var scrollPos;

var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	isLeft = false;
	isRight = false;

	scrollPos = 0;

    trees_x = [-1000, -800, -500, 80, 250, 570, 818, 1200, 2000];
    clouds = [
        {
            pos_x: 23
        },
        {
            pos_x: 200
        },
        {
            pos_x: 700
        },
        {
            pos_x: 1000
        },
        {
            pos_x: 1400
        },
        {
            pos_x: -500
        },
        {
            pos_x: -700
        }
    ];
    
    mountains = [
        {
            pos_x_offset: -100
        },
        {
            pos_x_offset: 380
        },
        {
            pos_x_offset: 450
        },
        {
            pos_x_offset: -450
        },
        {
            pos_x_offset: 800
        },
        {
            pos_x_offset: 1200
        }
    ];
    canyons = [
        {
            pos_x: 100,
            width: 100
        },
        {
            pos_x: 800,
            width: 100
        },
        {
            pos_x: -500,
            width: 100
        },
        {
            pos_x: 1000,
            width: 100
        },
        {
            pos_x: 1800,
            width: 100
        }
    ];
    collectables = [
        {
            x_pos: 200,
            y_pos: 0,
            size: 50,
            primaryColour: [115, 50, 12],
            secondaryColour: [133, 82, 0]
        },
        {
            x_pos: -350,
            y_pos: 0,
            size: 50,
            primaryColour: [115, 50, 12],
            secondaryColour: [133, 82, 0]
        },
        {
            x_pos: -800,
            y_pos: 0,
            size: 50,
            primaryColour: [115, 50, 12],
            secondaryColour: [133, 82, 0]
        },
        {
            x_pos: -1000,
            y_pos: 0,
            size: 50,
            primaryColour: [115, 50, 12],
            secondaryColour: [133, 82, 0]
        },
        {
            x_pos: 1100,
            y_pos: 0,
            size: 50,
            primaryColour: [115, 50, 12],
            secondaryColour: [133, 82, 0]
        }
    ];
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

    push();
    translate(scrollPos, 0);
    
	// Draw clouds.
    for(var j = 0; j < clouds.length; j++){
        new Cloud(clouds[j].pos_x);
    }
    
	// Draw mountains.
    for(var k = 0; k < mountains.length; k++){
        new Mountain(mountains[k].pos_x_offset);
    }

	// Draw trees.
    for(var i = 0; i < trees_x.length; i++){
        //Tree
        noStroke();
        fill(84, 56, 0);
        beginShape();
        vertex(trees_x[i] + 25, floorPos_y - 62);
        vertex(trees_x[i] + 25, floorPos_y - 32);
        vertex(trees_x[i] + 40, floorPos_y);
        vertex(trees_x[i] - 35, floorPos_y);
        vertex(trees_x[i] - 25, floorPos_y - 82);
        vertex(trees_x[i] - 25, floorPos_y - 82);
        endShape(CLOSE);

        //Tree branches
        fill(21, 115, 0);
        ellipse(trees_x[i] - 5, floorPos_y - 132, 90, 80);
        ellipse(trees_x[i] - 25, floorPos_y - 82, 90, 80);
        ellipse(trees_x[i] - 75, floorPos_y - 132, 90, 80);
        ellipse(trees_x[i] - 25, floorPos_y - 182, 75, 90);
        ellipse(trees_x[i] + 25, floorPos_y - 172, 100, 100);
        ellipse(trees_x[i] + 75, floorPos_y - 142, 90, 70);
        ellipse(trees_x[i] + 75, floorPos_y - 102, 100, 80);
        ellipse(trees_x[i] + 25, floorPos_y - 82, 80, 60);
    }
	// Draw canyons
    for(var n = 0; n < canyons.length; n++){
        //Canyon
        fill(50, 10, 0);
        rect(canyons[n].pos_x + 70, 432, canyons[n].width, 144);

        beginShape(); // Water effect
        fill(48, 140, 161);
        vertex(canyons[n].pos_x + 170, 460);
        vertex(canyons[n].pos_x + 120, 470);
        vertex(canyons[n].pos_x + 140, 485);
        vertex(canyons[n].pos_x + 70, 520);

        vertex(canyons[n].pos_x + 70, 576);
        vertex(canyons[n].pos_x + 130, 576);

        vertex(canyons[n].pos_x + 170, 510);
        vertex(canyons[n].pos_x + 170, 485);
        vertex(canyons[n].pos_x + 150, 475);
        vertex(canyons[n].pos_x + 150, 475);
        vertex(canyons[n].pos_x + 170, 470);
        endShape(CLOSE);
    }
    
    
	// Draw Bear
    for(var a = 0; a < collectables.length; a++){
        // Bear
        //Outlining bear structure for ease of visualisation
        stroke(0);

        //Arms
        fill(115, 50, 12);

        push(); //Left arm
        translate(collectables[a].x_pos + 525, collectables[a].y_pos + 390);
        rotate(0.5);
        ellipse(0, 0, 35, 20);
        pop();

        push(); //Right arm
        translate(collectables[a].x_pos + 475, collectables[a].y_pos + 390);
        rotate(-0.5);
        ellipse(0, 0, 35, 20);
        pop();

        //Body
        fill(115, 50, 12);
        ellipse(collectables[a].x_pos + 500,
                collectables[a].y_pos + 400,
                collectables[a].size - (collectables[a].size / 5),
                collectables[a].size);

        //Legs
        fill(collectables[a].secondaryColour);
        //Left leg
        ellipse(collectables[a].x_pos + 485, collectables[a].y_pos + 410, 20, 27);
        //Right leg
        ellipse(collectables[a].x_pos + 515, collectables[a].y_pos + 410, 20, 27);

        //Head
        ellipse(collectables[a].x_pos + 485, collectables[a].y_pos + 360, 17); //Left ear
        ellipse(collectables[a].x_pos + 515, collectables[a].y_pos + 360, 17); //Right ear

        fill(200);
        ellipse(collectables[a].x_pos + 485, collectables[a].y_pos + 360, 10); //Left ear inside
        ellipse(collectables[a].x_pos + 515, collectables[a].y_pos + 360, 10); //Right ear inside

        fill(collectables[a].primaryColour);
        ellipse(collectables[a].x_pos + 500, collectables[a].y_pos + 370, 36); //Face

        fill(collectables[a].secondaryColour);
        ellipse(collectables[a].x_pos + 500, collectables[a].y_pos + 378, 23, 18); //Snout

        fill(0);
        ellipse(collectables[a].x_pos + 493, collectables[a].y_pos + 365, 5); //Left eye
        ellipse(collectables[a].x_pos + 507, collectables[a].y_pos + 365, 5); //Right eye
        triangle(collectables[a].x_pos + 500, collectables[a].y_pos + 379, collectables[a].x_pos + 504, collectables[a].y_pos + 375, collectables[a].x_pos + 496, collectables[a].y_pos + 375); //Nose
        line(collectables[a].x_pos + 499.5, collectables[a].y_pos + 382, collectables[a].x_pos + 499.5, collectables[a].y_pos + 375);

        beginShape();
        noFill();
        vertex(collectables[a].x_pos + 494, collectables[a].y_pos + 382);
        vertex(collectables[a].x_pos + 496, collectables[a].y_pos + 383);
        vertex(collectables[a].x_pos + 499, collectables[a].y_pos + 383);

        vertex(collectables[a].x_pos + 502, collectables[a].y_pos + 383);
        vertex(collectables[a].x_pos + 505, collectables[a].y_pos + 383);
        vertex(collectables[a].x_pos + 506, collectables[a].y_pos + 382);
        endShape();
    }
    
    pop();

	// game character
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


	// game character movement
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
}

function keyPressed()
{

	if(key == 'A' || keyCode == 37)
	{
		isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = true;
	}

}

function keyReleased()
{
	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}
}

class Cloud{
    constructor(offset){
        this.buildCloud(offset);
    }

    buildCloud(offset){
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

class Mountain{
    constructor(offset){
        this.buildMountain(offset);
    }
    
    buildMountain(offset){
        fill(102, 51, 0);
        triangle(450 + offset, 432, (((450 + offset) + (600 + offset)) / 2), 100, 600 + offset, 432);

        fill(133, 66, 0);
        triangle(490 + offset, 432, (((450 + offset) + (600 + offset)) / 2), 100, 600 + offset, 432);

        fill(224, 224, 224);
        triangle(502 + offset, 200, (((450 + offset) + (600 + offset)) / 2), 100, 550 + offset, 210);
    }
}