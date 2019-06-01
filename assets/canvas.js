var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 4;


var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 50;

// window.addEventListener('mousemove', function(event){
// 	mouse.x = event.x;
// 	mouse.y = event.y;
// });

document.querySelector('button').onclick = function(){
	document.querySelector('#buttonDiv').remove();
	canvas.height = window.innerHeight;
	mouse.x = undefined;
	mouse.y = undefined;
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


var emojiArray = [];

function createEmojis() {

	function ranVal() {
		var obj = {
			x: undefined,
			y: undefined,
			dx: undefined,
			dy: undefined
		}

		obj.x = Math.random() * (innerWidth - 30 * 2) + 30;
		obj.y = Math.random() * (canvas.height - 30 * 2) + 30;
		obj.dx = (Math.random() - 0.5) * 5;
		obj.dy = (Math.random() - 0.5) * 5;

		return obj;
	}

	// emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'🏝'));
	// emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'🇬🇧'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'💜'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'💙'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'💚'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'💛'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'❤️'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'🧡'));
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

function Emoji(x, y, dx, dy, emoji) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;

	this.draw = function(){
		c.font="50px Comic Sans MS";
		c.font.opacity="0.1";
		c.fillText(emoji, this.x, this.y);
	}



	this.onclick = function() {
		console.log('yes')
	}

	this.update = function() {

		if (this.x + 30 > innerWidth || this.x < 0) {
			this.dx = -this.dx;
		}

		if (this.y - 10 < 0  || this.y + 10 > canvas.height) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			// if (this.radius < maxRadius) {
				this.font +=1;
			// }
		// } else if (this.radius > this.minRadius) {
		} else {
			this.font -= 1;
		}

		this.draw();
	}
}



function animate() {
	// console.log(canvas.width, innerWidth)
	c.clearRect(0, 0, innerWidth, innerHeight);
	for (var j = 0; j < emojiArray.length; j++) {
		emojiArray[j].update();
	}
	for (var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}
	requestAnimationFrame(animate);
}

createCircles(100);
createEmojis();
animate();
