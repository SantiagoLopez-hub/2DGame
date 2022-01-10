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
    

	//Jumping facing forwards
	stroke(100);
	noFill();
	rect(220, 60, 50, 80);
	noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
    
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
    


	//Walking, turned left
	stroke(100);
	noFill();
	rect(20, 260, 50, 80);
	noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
    
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


	//Walking, turned right
	stroke(100);
	noFill();
	rect(220, 260, 50, 80);
	noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
    
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

	//Jumping right
	stroke(100);
	noFill();
	rect(20, 460, 50, 80);
	noStroke();
	fill(0);
	text("5. Jumping to the right", 20, 560);

	gameChar_x = 45;
	gameChar_y = 537;

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
    
	//Jumping to the left
	stroke(100);
	noFill();
	rect(220, 460, 50, 80);
	noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
    
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
