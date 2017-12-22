//Collision detection and resolution
//move the mouse, the sprite responds to overlapings, collision,
//and displaces another sprite

var box, asterisk, cloud, circle;

function setup() 
{
    var canvas = createCanvas(800, 400);

    canvas.parent('anim-canvas');

    //create 4 sprites
    alyssa = createSprite(305, 255);
    alyssa.addAnimation('normal', 'public/anim/assets/alyssa_0000.png', 'public/anim/assets/alyssa_0002.png');
    alyssa.addAnimation("stretch", 'public/anim/assets/alyssa_0003.png', 'public/anim/assets/alyssa_0003.png')
    alyssa.position.x = 200;
    alyssa.position.y = 250;
}

function draw() 
{
    background(120, 120, 120);

    alyssa.debug = mouseIsPressed;

    if (alyssa.position.y < 250)
    {
        alyssa.velocity.y += 1;
        alyssa.changeAnimation("stretch");
    }
    else
    {
      alyssa.velocity.y = 0;
    }

    if (keyDown("w"))
    {
        if (alyssa.position.y > 120)
        {
          alyssa.changeAnimation("stretch");
          alyssa.velocity.y = -15;
        }
    }
    else
    {
        if (alyssa.position.y < 250)
        {
            alyssa.changeAnimation("stretch");
        }
        else
        {
            alyssa.changeAnimation("normal");
        }
    }

    drawSprites();
}
