var globalHeight = 300;
var globalWidth = 300;
var bubbles = new Array(10);

class Bubble
{
	constructor(posx, posy, vx, vy)
	{
		this.x = posx;

		this.y = posy;

		this.vx = vx;
		if (Math.random() * 10 < 5)
			this.vx *= -1 * Math.random() * 4;

		this.vy = vy;
		if (Math.random() * 10 < 5)
			this.vy *= -1 * Math.random() * 4;
	}

	simulate()
	{
		if ((this.x + this.vx) > globalWidth || (this.x + this.vx) < 0)
			this.vx *= -1 * 1.1;

		if ((this.y + this.vy) > globalHeight || (this.y + this.vy) < 0)
			this.vy *= -1 * 1.1;

		this.x += this.vx;
		this.y += this.vy;
	}

	render()
	{
		this.simulate();
		ellipse(this.x, this.y, 10, 10);
	}
}

function setup() 
{

	var canvas = createCanvas(globalHeight, globalWidth);

	canvas.parent('anim-canvas');

	background(95,244,66);

	for (var i = 0; i < bubbles.length; i++)
	{
		bubbles[i] = new Bubble(Math.random() * globalHeight, 
								Math.random() * globalWidth, 
								1, 
								1);
	}
}

function draw()
{
	clear();

	background(95,244,66);

	fill(0, 102, 153);
	textSize(32);
	text(bubbles.length, 10, 30);

	for (var i = 0; i < bubbles.length; i++)
	{
		bubbles[i].render();
	}
}