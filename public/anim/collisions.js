//Collision detection and resolution
//move the mouse, the sprite responds to overlapings, collision,
//and displaces another sprite

var box, asterisk, cloud, circle;

function setup() {

  var canvas = createCanvas(800, 400);

  canvas.parent('anim-canvas');

  //create 4 sprites
  circle = createSprite(400, 200);
  //compact way to add an image
  circle.addImage(loadImage('public/anim/assets/plain_circle.png'));

  box = createSprite(200, 200);
  box.addAnimation('normal', 'public/anim/assets/box0001.png', 'public/anim/assets/box0003.png');

  cloud = createSprite(600, 200);
  cloud.addAnimation('normal', 'public/anim/assets/cloud_breathing0001.png', 'public/anim/assets/cloud_breathing0009.png');

  asterisk = createSprite(200, 200);
  asterisk.addAnimation('normal', 'public/anim/assets/asterisk_normal0001.png', 'public/anim/assets/asterisk_normal0003.png');

  asterisk.addAnimation('round', 'public/anim/assets/asterisk_circle0006.png', 'public/anim/assets/asterisk_circle0008.png');


}

function draw() {
  background(255, 255, 255);

  asterisk.position.x = mouseX;
  asterisk.position.y = mouseY;

  //check and resolve the inteactions between sprites

  //sprite.overlap() returns true if overlapping occours
  //note: by default the check is performed on the images bounding box
  //press mouse button to visualize them
  if(asterisk.overlap(circle))
    asterisk.changeAnimation('round');
  else
    asterisk.changeAnimation('normal');

  //collide also returns a true/false but it can simply be used to
  //resolve collisions.
  //If overlapping with box asterisk will be placed
  //in the closest non overlapping position
  asterisk.collide(box);

  //displace is the opposite of collide, the sprite in the parameter will
  //be pushed away but the sprite calling the function
  asterisk.displace(cloud);

  //if debug is set to true bounding boxes, centers and depths are visualized
  asterisk.debug = mouseIsPressed;
  circle.debug = mouseIsPressed;
  box.debug = mouseIsPressed;
  cloud.debug = mouseIsPressed;

  drawSprites();
}
