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
var clouds;
var lastObstaclePos = 0;
var obstacleGap = 100;
var obstacleImg1, obstacleImg2, obstacleImg3, cloudImg1, cloudImg2;
var obstacleArray;
var gameOver = true;
var nextWaypoint = 1000;
var speedScalar = 10;
var highScore = 0;

//operations that occur before setup
function preload() {
  //song = loadSound('public/anim/assets/rainbow_road_0000.png');

  roadImg = loadImage("public/anim/assets/rainbow_road_0000.png");

  obstacleImg1 = loadImage("public/anim/assets/penguin_0000.png");
  obstacleImg2 = loadImage("public/anim/assets/penguin_0001.png");
  obstacleImg3 = loadImage("public/anim/assets/penguin_0002.png");

  cloudImg1 = loadImage("public/anim/assets/cloud_0000.png");
  cloudImg2 = loadImage("public/anim/assets/cloud_0001.png");
}

//update alyssa's position and info
function updateAlyssa()
{

  alyssa.velocity.x = Math.log(alyssa.position.x) - 1;

  //check if alyssa is airborne
  if (alyssa.velocity.y != 0)
    airborne = true;

  //check if alyssa is above the ground
  if (alyssa.position.y < groundLevel)
  {
    alyssa.velocity.y += 0.5;
    alyssa.rotation += 1;
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
      if (alyssa.position.y > 180)
      {
        alyssa.velocity.y = -8;
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
  roadA = createSprite(450, 350);
  roadA.addImage(roadImg);
  roadB = createSprite(900, 350);
  roadB.addImage(roadImg);

  cloudArray = [cloudImg1, cloudImg2];

  obstacleArray = [[obstacleImg1, 64, 100], [obstacleImg2, 64, 120], [obstacleImg3, 90, 90]];

  //initialize alyssa
  alyssa = createSprite(100, groundLevel);
  alyssa.addAnimation('idle', 'public/anim/assets/alyssa_0000.png', 'public/anim/assets/alyssa_0000.png');
  alyssa.addAnimation('normal', 'public/anim/assets/alyssa_0000.png', 'public/anim/assets/alyssa_0002.png');
  alyssa.addAnimation("stretch", 'public/anim/assets/alyssa_0003.png', 'public/anim/assets/alyssa_0003.png')
  alyssa.setCollider("circle", 0,-10,50);

  //make a container for the obstacles
  obstacles = new Group();

  clouds = new Group();

  //set the camera height
  camera.position.y = 200;

  textSize(30);
  textFont('Oleo Script');
}

//recurring operations
function draw()
{
  //pink background
  background(0,216,255);

  //debug
  camera.position.x = alyssa.position.x + 350;
  fill(255);
  text("Score: " + Math.floor(camera.position.x/100) + "\nHigh: " + highScore, alyssa.position.x+650, 150);

  if (!gameOver)
  {
    //alyssa.debug = true;

    //update alyssa's position and info
    updateAlyssa();

    //wrap the road
    if (camera.position.x >= roadA.position.x)
      roadB.position.x = roadA.position.x + 900;
    if (camera.position.x >= roadB.position.x)
      roadA.position.x = roadB.position.x + 900;

    //spawn obstacles
    if (camera.position.x > lastObstaclePos + obstacleGap)
    {
      obstacleGap = random(20, 100);

      for (var i = 0; i <= Math.floor(random(0,3)); i++)
      {
        var obstacleType = Math.floor(random(0,3));
        var obstacle = createSprite(alyssa.position.x + 900 + (40*i), groundLevel);
        obstacle.scale = 0.6;
        obstacle.position.y += obstacle.height/4;
        obstacle.setCollider("rectangle", 0, 0, obstacleArray[obstacleType][1], obstacleArray[obstacleType][2]);
        lastObstaclePos = alyssa.position.x + 900;
        obstacle.addImage(obstacleArray[obstacleType][0]);
        obstacles.add(obstacle);
      }

      var cloudType = Math.floor(random(0,2));
      var cloud = createSprite(alyssa.position.x + 900 + random(20,100), random(20,70));
      cloud.addImage(cloudArray[cloudType]);
      cloud.velocity.x = 3;
      cloud.depth = 0;
      clouds.add(cloud);
      //obstacle.debug = true;

    }

    //get rid of passed obstacles
    for(var i = 0; i < obstacles.length; i++)
      if(obstacles[i].position.x < alyssa.position.x - 120)
        obstacles[i].remove();

    //get rid of passed clouds
    for(var i = 0; i < clouds.length; i++)
      if(clouds[i].position.x < alyssa.position.x - 200)
        clouds[i].remove();

    if (alyssa.overlap(obstacles))
    {
      die();
    }

  }
  else
  {
    if (keyWentDown("d"))
    {
      newGame();
    }

    if (camera.position.x > 500)
    {
      printGameOver();
    }
    else
    {
      text("Press \"D\" to start", camera.position.x - 100, 150);
    }
  }

  //draw sprites
  drawSprites();
}

function die() {
  updateSprites(false);
  gameOver = true;

  if (camera.position.x > highScore)
    highScore = Math.floor(camera.position.x/100);
}

function newGame() {
  obstacles.removeSprites();
  clouds.removeSprites();
  gameOver = false;
  updateSprites(true);

  alyssa.position.x = 100;
  alyssa.position.y = groundLevel;
  alyssa.velocity.y = 0;
  alyssa.velocity.x = 4;
  alyssa.rotation = 0;

  roadA.position.x = 450;
  roadB.position.x = 900;

  lastObstaclePos = 0;

  sPos = 0;
}

var sPos = 0;
var s = "Game Over\nPress \"D\" to restart";
var speed = 2500; /* The speed/duration of the effect in milliseconds */

function printGameOver() {
  if (sPos < s.length) {
    text(s.substring(0,sPos), camera.position.x - 100, 150);
    sPos++;
    setTimeout(printGameOver, speed);
  }
  else
  {
    text(s, camera.position.x - 100, 150);
  }
}