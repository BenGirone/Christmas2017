//Collision detection and resolution
//move the mouse, the sprite responds to overlapings, collision,
//and displaces another sprite

//variable declaration
var alyssa;
var groundLevel = 250;
var airborne = false;
var roadA, roadB;
var roadImg;
var obstacles;
var lastObstaclePos = 0;
var obstacleGap = 100;
var obstacleImg1, obstacleImg2, obstacleImg3;

//operations that occur before setup
function preload() {
  //song = loadSound('public/anim/assets/rainbow_road_0000.png');
}

//update alyssa's position and info
function updateAlyssa()
{
  //check if alyssa is airborne
  if (alyssa.velocity.y != 0)
      airborne = true;

  //check if alyssa is above the ground
  if (alyssa.position.y < groundLevel)
  {
    alyssa.velocity.y += 1;
    alyssa.rotation += 2;
    alyssa.changeAnimation("stretch");
  }
  else //alyssa is on the ground
  {
    alyssa.velocity.y = 0;
    alyssa.rotation = 0;
    airborne = false;
  }

  //check if the "w" key is pressed
  if (keyDown("w"))
  {
    //check if alyssa is rising
    if (alyssa.velocity.y <= 0)
    {
      if (alyssa.position.y > 140)
      {
        alyssa.velocity.y = -13;
        alyssa.rotation = 330;
        alyssa.changeAnimation("stretch");
      }
    }
  }
  else //alyssa is falling
  {
    //check if alyssa is airborne
    if (airborne)
    {
      alyssa.changeAnimation("stretch");
    }
    else //alyssa has reached the ground
    {
      alyssa.changeAnimation("normal");
    }
  }
}

//prelimnary operations
function setup() 
{
  //create a canvas
  var canvas = createCanvas(900, 400);

  //place the canvas on the page
  canvas.parent('anim-canvas');

  //initialize the road
  roadImg = loadImage("public/anim/assets/rainbow_road_0000.png");
  roadA = createSprite(450, 350);
  roadA.addImage(roadImg);
  roadB = createSprite(900, 350);
  roadB.addImage(roadImg);

  //initialize alyssa
  alyssa = createSprite(100, groundLevel);
  alyssa.addAnimation('normal', 'public/anim/assets/alyssa_0000.png', 'public/anim/assets/alyssa_0002.png');
  alyssa.addAnimation("stretch", 'public/anim/assets/alyssa_0003.png', 'public/anim/assets/alyssa_0003.png')
  alyssa.velocity.x = 4;
  //alyssa.setCollider("rectangle", 0,0,122,102);
  alyssa.setCollider("circle", 0,-10,60);

  //make a container for the obstacles
  obstacles = new Group();

  //set the camera height
  camera.position.y = 200;
}

//recurring operations
function draw()
{
  //pink background
  background(255,182,193);

  alyssa.debug = mouseIsPressed;

  //update alyssa's position and info
  updateAlyssa();

  //debug
  camera.position.x = alyssa.position.x + 350;
  text("camera x: " + camera.position.x + "\n road x: " + roadA.position.x, alyssa.position.x, 10);

  //wrap the road
  if (camera.position.x >= roadA.position.x)
    roadB.position.x = roadA.position.x + 900;
  if (camera.position.x >= roadB.position.x)
    roadA.position.x = roadB.position.x + 900;

    //spawn obstacles
    if(frameCount % 60 == 0) 
    {
      if (camera.position.x > lastObstaclePos + obstacleGap)
      {
        var obstacleGap = random(80, 300);
        var obstacle = createSprite(alyssa.position.x + 900, groundLevel);
        obstacle.addImage(obstacleImg1);
        obstacles.add(obstacle);
      }
    }

    //get rid of passed obstacles
    for(var i = 0; i < obstacles.length; i++)
      if(obstacles[i].position.x < alyssa.position.x - 120)
        obstacles[i].remove()

  //draw sprites
  drawSprites();
}
