var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x;
var treePos_y;

var canyon;
var collectable;
var mountain;
var cloud;
var collectable;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = 432;
	gameChar_x = width/2 + 100;
	gameChar_y = floorPos_y;

	treePos_x = 775;
	treePos_y = floorPos_y;
    
    canyon = {
        x_pos: 0,
        width: 100
    };
    
    mountain = {
        x_pos: -250
    };
    
    cloud = {
        x_pos: 0
    };
    
    collectable = {
        x_pos: 0,
        y_pos: 0,
        size: 50,
        primaryColour: [115, 50, 12],
        secondaryColour: [133, 82, 0]
    };
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    
    //Cloud
    var cloud1 = new Cloud(cloud.x_pos);
    var cloud2 = new Cloud(cloud.x_pos + 300);
    var cloud2 = new Cloud(cloud.x_pos + 400);
    
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
    
    //Mountain
    var mountain1 = new Mountain(mountain.x_pos - 140);
    var mountain2 = new Mountain(mountain.x_pos);
    var mountain4 = new Mountain(mountain.x_pos + 400);
    var mountain3 = new Mountain(mountain.x_pos + 300);
    
    //Tree
    noStroke();
    fill(84, 56, 0);
    beginShape();
    vertex(treePos_x + 25, treePos_y - 62);
    vertex(treePos_x + 25, treePos_y - 32);
    vertex(treePos_x + 40, treePos_y);
    vertex(treePos_x - 35, treePos_y);
    vertex(treePos_x - 25, treePos_y - 82);
    vertex(treePos_x - 25, treePos_y - 82);
    endShape(CLOSE);
    
    //Tree branches
    fill(21, 115, 0);
    ellipse(treePos_x - 5, treePos_y - 132, 90, 80);
    ellipse(treePos_x - 25, treePos_y - 82, 90, 80);
    ellipse(treePos_x - 75, treePos_y - 132, 90, 80);
    ellipse(treePos_x - 25, treePos_y - 182, 75, 90);
    ellipse(treePos_x + 25, treePos_y - 172, 100, 100);
    ellipse(treePos_x + 75, treePos_y - 142, 90, 70);
    ellipse(treePos_x + 75, treePos_y - 102, 100, 80);
    ellipse(treePos_x + 25, treePos_y - 82, 80, 60);
    
    
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

    //Game Character
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

function mousePressed()
{
    gameChar_x = mouseX;
    gameChar_y = mouseY;

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