//Collision detection and resolution
//move the mouse, the sprite responds to overlapings, collision,
//and displaces another sprite

var alyssa;
var groundLevel = 300;
var airborne = false;
var road;
var roadImg;

function updateAlyssa()
{
  if (alyssa.velocity.y != 0)
      airborne = true;

  if (alyssa.position.y < groundLevel)
  {
    alyssa.velocity.y += 1;
    alyssa.changeAnimation("stretch");
  }
  else
  {
    alyssa.velocity.y = 0;
    airborne = false;
  }

  if (keyDown("w"))
  {
    if (alyssa.velocity.y <= 0)
    {
      if (alyssa.position.y > 180)
      {
        alyssa.velocity.y = -13;
        alyssa.changeAnimation("stretch");
      }
    }
  }
  else
  {
    if (airborne)
    {
      alyssa.changeAnimation("stretch");
    }
    else
    {
      alyssa.changeAnimation("normal");
    }

  }
}

function setup() 
{
  var canvas = createCanvas(900, 400);

  canvas.parent('anim-canvas');


  roadImg = loadImage("public/anim/assets/rainbow_road_0000.png");
  road = createSprite(450, 350);
  road.addImage(roadImg);

  alyssa = createSprite(122, 102);
  alyssa.addAnimation('normal', 'public/anim/assets/alyssa_0000.png', 'public/anim/assets/alyssa_0002.png');
  alyssa.addAnimation("stretch", 'public/anim/assets/alyssa_0003.png', 'public/anim/assets/alyssa_0003.png')
  alyssa.position.x = 100;
  alyssa.position.y = groundLevel;
  alyssa.rotateToDirection = true;
  alyssa.setCollider("rectangle", 0,0,122,102);
}

function draw()
{
  background(255,182,193);

  alyssa.debug = mouseIsPressed;

  updateAlyssa();

  drawSprites();
}
