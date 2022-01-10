var gameChar_x = 0;
var gameChar_y = 0;

function setup()
{
	createCanvas(400, 600);
}

function draw()
{
	background(255);

	//Standing, facing frontwards
	stroke(100);
	noFill();
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;

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
