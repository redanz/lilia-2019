var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 4;


var c = canvas.getContext('2d');
var audio = document.querySelector('#audio');

var mouse = {
	x: undefined,
	y: undefined
}

var click = {
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
};

// window.addEventListener('click', function(event){
// 	click.x = event.x;
// 	click.y = event.y;
// });

document.onclick = function (event) {
	click.x = event.x;
	click.y = event.y;
};

canvas.onclick = function () {};

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

var circleArray = [];

function createCircles(num) {
	let radius;
	let x;
	let y;
	let dx;
	let dy

	for (var i = 0; i < num-1; i++) {
		radius = Math.random() * 19 + 1;
		x = Math.random() * (innerWidth - radius * 2) + radius;
		y = Math.random() * (canvas.height - radius * 2) + radius;
		dx = (Math.random() - 0.5) * 5;
		dy = (Math.random() - 0.5) * 5;

		let r = Math.random() * 255;
		let g = Math.random() * 255;
		let b = Math.random() * 255;
		let a = Math.random();
		let color = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
		circleArray.push(new Circle(x, y, dx, dy, radius, color));
	}

	let color = 'rgba(' + Math.random() * 255 + ', ' + Math.random() * 255 + ', ' + Math.random() * 255 + ', ' + 1 + ')';
	radius = Math.random() * 19 + 1;
	x = Math.random() * (innerWidth - radius * 2) + radius;
	y = Math.random() * (canvas.height - radius * 2) + radius;
	dx = (Math.random() - 0.5) * 5;
	dy = (Math.random() - 0.5) * 5;

	circleArray.push(new Circle(x, y, dx, dy, radius, color));
}

var emojiArray = [];

function createEmojis() {
	// emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'🦄'));
	// emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'🦁'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'💜'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'💙'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'💚'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'💛'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'❤️'));
	emojiArray.push(new Emoji(ranVal().x,ranVal().y,ranVal().dx,ranVal().dy,'🧡'));
}

function ranVal() {
	// x min,max: [-2, canvas.width-50]
	// y min,max: [44, canvas.height-3]
	var obj = {
		x: undefined,
		y: undefined,
		dx: undefined,
		dy: undefined
	}

	obj.x = Math.random() * (canvas.width - 48) - 2;
	obj.y = Math.random() * (canvas.height - 47) + 44;
	obj.dx = (Math.random() - 0.5) * 5;
	obj.dy = (Math.random() - 0.5) * 5;
	return obj;
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
	this.emoji = emoji;

	this.draw = function(){
		c.font="50px Comic Sans MS";
		c.fillText(emoji, this.x, this.y);
	};

	this.update = function() {

		if (this.x + 50 > innerWidth || this.x < -2) {
			this.dx = -this.dx;
		}

		if (this.y - 43 < 0  || this.y + 4 > canvas.height) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (click.x != undefined) {
			if (click.x - this.x < 80 && click.x - this.x > -30 && click.y - this.y < 30 && click.y - this.y > -80) {
				audio.currentTime = 0;
				audio.play();
				if (emojiMap[this.emoji] != undefined){
					emojiArray.push(new Emoji(this.x,this.y,ranVal().dx,ranVal().dy,emojiMap[this.emoji][Math.floor(Math.random()*emojiMap[this.emoji].length)]));
				} else {
					emojiArray.push(new Emoji(this.x,this.y,ranVal().dx,ranVal().dy,this.emoji));
				}
				
				click.x = undefined;
				click.y = undefined;
			}
		}
		
		this.draw();
	}
}

var emojiMap = {
	'❤️': ['🧚‍♀️','🎈'],
	'🧡': ['🦁', '🎃'],
	'💛': ['🐥', '🐯'],
	'💚': ['🦖', '🐢'],
	'💙': ['🐬', '🦋'],
	'💜': ['🦄', '☂️']
}

function animate() {
	c.clearRect(0, 0, innerWidth, innerHeight);
	for (var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}
	for (var j = 0; j < emojiArray.length; j++) {
		emojiArray[j].update();
	}
	
	click.x = undefined;
	click.y = undefined;
	requestAnimationFrame(animate);
}

createEmojis();
createCircles(100);
animate();
