var bear = {
    bodyPosition_x: 500,
    bodyPosition_y: 400,
    bodyWidth: 40,
    bodyHeight: 50,
    primaryColour: [115, 50, 12],
    secondaryColour: [133, 82, 0],
    head: {
        facePosition_x: 500,
        facePosition_y: 370,
        facePosition_width: 36,
        facePosition_height: 36,
        snoutPosition_x: 500,
        snoutPosition_y: 378,
        snoutPosition_width: 23,
        snoutPosition_height: 18,
        nose: [500, 379, 504, 375, 496, 375],
        eyes: {
            left: {
                position_x: 493,
                position_y: 365,
                width: 5,
                height: 5
            },
            right: {
                position_x: 507,
                position_y: 365,
                width: 5,
                height: 5
            }
        },
        ears: {
            left: {
                position_x: 485,
                position_y: 360,
                width: 17,
                height: 17,
                inside:{
                    position_x: 485,
                    position_y: 360,
                    width: 10,
                    height: 10
                }
            },
            right: {
                position_x: 515,
                position_y: 360,
                width: 17,
                height: 17,
                inside:{
                    position_x: 515,
                    position_y: 360,
                    width: 10,
                    height: 10
                }
            }
        }
    },
    arms: {
        left: {
            position_x: 20,
            position_y: 109.5,
            width: 15,
            height: 30
        },
        right: {
            position_x: -42,
            position_y: 97,
            width: 15,
            height: 29
        }
    },
    legs: {
        left: {
            position_x: 485,
            position_y: 410,
            width: 20,
            height: 27
        },
        right: {
            position_x: 515,
            position_y: 410,
            width: 20,
            height: 27
        }
    }
};

function setup()
{
	createCanvas(1024, 576);

    for (var key in bear) {
        console.log(bear); // whole object
        console.log(bear[key]); // only values
    }
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

    
	noStroke();
	fill(0,155,0);
	rect(0, 432, 1024, 144); //draw some green ground

	//1. a cloud in the sky
    var cloud1 = new Cloud(0);
    var cloud2 = new Cloud(200);
    var cloud3 = new Cloud(500);
    var cloud4 = new Cloud(560);
    

	//2. a mountain in the distance

	//3. a tree

    //Tree trunk
    fill(84, 56, 0);
    beginShape();
    vertex(800, 370);
    vertex(800, 400);
    vertex(815, 432);
    vertex(740, 432);
    vertex(750, 350);
    vertex(750, 350);
    endShape(CLOSE);
    
    //Tree branches
    fill(21, 115, 0);
    ellipse(770, 300, 90, 80);
    ellipse(750, 350, 90, 80);
    ellipse(700, 300, 90, 80);
    ellipse(750, 250, 75, 90);
    ellipse(800, 260, 100, 100);
    ellipse(850, 290, 90, 70);
    ellipse(850, 330, 100, 80);
    ellipse(800, 350, 80, 60);
    

	//4. a canyon
    
    fill(50, 10, 0);
    rect(70, 432, 100, 144);
    
    // Water effect
    beginShape();
    fill(48, 140, 161);
    vertex(170, 460);
    vertex(120, 470);
    vertex(140, 485);
    vertex(70, 520);
    
    vertex(70, 576);
    vertex(130, 576);
    
    vertex(170, 510);
    vertex(170, 485);
    vertex(150, 475);
    vertex(150, 475);
    vertex(170, 470);
    endShape(CLOSE);
    
    
	//5. a bear
    
    //Outlining bear structure for ease of visualisation
    stroke(0);
    
    //Arms
    fill(115, 50, 12);
    push(); //Left arm
    translate(width / 2, height / 2);
    rotate(PI / 6.0);
    ellipse(bear.arms.left.position_x,
            bear.arms.left.position_y,
            bear.arms.left.width,
            bear.arms.left.height);
    pop();
    
    push(); //Right arm
    translate(width / 2, height / 2);
    rotate(PI / -6.0);
    ellipse(bear.arms.right.position_x,
            bear.arms.right.position_y,
            bear.arms.right.width,
            bear.arms.right.height);
    pop();
    
    //Body
    ellipse(bear.bodyPosition_x, bear.bodyPosition_y, bear.bodyWidth, bear.bodyHeight);
    
    
    //Legs
    fill(bear.secondaryColour);
    ellipse(bear.legs.left.position_x,
            bear.legs.left.position_y,
            bear.legs.left.width,
            bear.legs.left.height); //Left leg
    ellipse(bear.legs.right.position_x,
            bear.legs.right.position_y,
            bear.legs.right.width,
            bear.legs.right.height); //Right leg
    
    
    //Head
    ellipse(bear.head.ears.left.position_x,
            bear.head.ears.left.position_y,
            bear.head.ears.left.width,
            bear.head.ears.left.height); //Left ear
    ellipse(bear.head.ears.right.position_x,
            bear.head.ears.right.position_y,
            bear.head.ears.right.width,
            bear.head.ears.right.height); //Right ear
    
    fill(200);
    ellipse(bear.head.ears.left.inside.position_x,
            bear.head.ears.left.inside.position_y,
            bear.head.ears.left.inside.width,
            bear.head.ears.left.inside.height); //Left ear inside
    ellipse(bear.head.ears.right.inside.position_x,
            bear.head.ears.right.inside.position_y,
            bear.head.ears.right.inside.width,
            bear.head.ears.right.inside.height); //Right ear inside
    
    fill(bear.primaryColour);
    ellipse(bear.head.facePosition_x,
           bear.head.facePosition_y,
           bear.head.facePosition_width,
           bear.head.facePosition_height); //Face
    
    fill(bear.secondaryColour);
    ellipse(bear.head.snoutPosition_x,
           bear.head.snoutPosition_y,
           bear.head.snoutPosition_width,
           bear.head.snoutPosition_height); //Snout
    
    
    fill(0);
    ellipse(bear.head.eyes.left.position_x,
           bear.head.eyes.left.position_y,
           bear.head.eyes.left.width,
           bear.head.eyes.left.height); //Left eye
    ellipse(bear.head.eyes.right.position_x,
           bear.head.eyes.right.position_y,
           bear.head.eyes.right.width,
           bear.head.eyes.right.height); //Right eye
    triangle(bear.head.nose[0],
             bear.head.nose[1],
             bear.head.nose[2],
             bear.head.nose[3],
             bear.head.nose[4],
             bear.head.nose[5]); //Nose
    line(499.5, 382, 499.5, 375);
    
    beginShape();
    noFill();
    vertex(494, 382);
    vertex(496, 383);
    vertex(499, 383);
    
    vertex(502, 383);
    vertex(505, 383);
    vertex(506, 382);
    endShape();
    
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
