var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 4;


var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 50;

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

document.querySelector('button').onclick = function(){
	canvas.height = window.innerHeight;
	console.log(event.x, event.y);

};

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})

var circleArray = [];

function createCircles(num) {
	for (var i = 0; i < num; i++) {
		let radius = Math.random() * 19 + 1;
		let x = Math.random() * (innerWidth - radius * 2) + radius;
		let y = Math.random() * (canvas.height - radius * 2) + radius;
		let dx = (Math.random() - 0.5) * 5;
		let dy = (Math.random() - 0.5) * 5;

		let r = Math.random() * 255;
		let g = Math.random() * 255;
		let b = Math.random() * 255;
		let a = Math.random();
		let color = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
		circleArray.push(new Circle(x, y, dx, dy, radius, color));
	}
}


function Circle(x, y, dx, dy, radius, color){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = color;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		// c.strokeStyle = this.color;
		// c.stroke();
		c.fillStyle = color;
		c.fill();
	}

	this.update = function() {

		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius) {
				this.radius +=1;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		this.draw();
	}

}

function animate() {
	// console.log(canvas.width, innerWidth)
	c.clearRect(0, 0, innerWidth, innerHeight);
	for (var i = 0; i<circleArray.length; i++){
		circleArray[i].update();
	}
	requestAnimationFrame(animate);
}

createCircles(200);
animate();
