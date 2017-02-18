//create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//background images
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
};
bgImage.src = "images/background.png";

//ogre image
var ogreReady = false;
var ogreImage = new Image();
ogreImage.onload = function() {
	ogreReady = true;
};
ogreImage.src = "images/GodOgre.png";

//princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function(){
	princessReady = true;
};
princessImage.src = "images/princess.png";

//knight image
var knightReady = false;
var knightImage = new Image();
knightImage.onload = function(){
	knightReady = true;
};
knightImage.src ="images/knight.png";

var ogre = {
	speed: 300
};
var princess = {
	speed: 300
};
var knight = {
	speed: 300
};
var princessCaught = 0;
var knightCaught = 0;
var ogreCaught = 0;

//player input
var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//reset when player wins
var reset = function() {
	//reset ogre
	ogre.x = 32 + (Math.random() * (canvas.width - 64));
	ogre.y = 32 + (Math.random() * (canvas.height - 64));
	
	//reset princess
	princess.x = 32 + (Math.random() * (canvas.width - 64));
	princess.y = 32 + (Math.random() * (canvas.height - 64));
	
	//reset knight
	knight.x = 32 + (Math.random() * (canvas.width - 64));
	knight.y = 32 + (Math.random() * (canvas.height - 64));
};

//update game objects
var update = function(modifier) {
	// ogre movements arrow keys
	if (38 in keysDown && ogre.y > 0) {
		ogre.y -= ogre.speed * modifier;
	}
	if (40 in keysDown && ogre.y < 425) {
		ogre.y += ogre.speed * modifier;
	}
	if (37 in keysDown && ogre.x > 0) {
		ogre.x -= ogre.speed * modifier;
	}
	if (39 in keysDown && ogre.x < 475) {
		ogre.x += ogre.speed * modifier;
	}
	
	// princess movements wasd
	if (87 in keysDown && princess.y > 0) {
		princess.y -= princess.speed * modifier;
	}
	if (83 in keysDown && princess.y < 425) {
		princess.y += princess.speed * modifier;
	}
	if (65 in keysDown && princess.x > 0) {
		princess.x -= princess.speed * modifier;
	}
	if (68 in keysDown && princess.x < 475) {
		princess.x += princess.speed * modifier;
	}
	// knight movements 8456
	if (104 in keysDown && knight.y > 0) {
		knight.y -= knight.speed * modifier;
	}
	if (101 in keysDown && knight.y < 425) {
		knight.y += knight.speed * modifier;
	}
	if (100 in keysDown && knight.x > 0) {
		knight.x -= knight.speed * modifier;
	}
	if (102 in keysDown && knight.x < 475) {
		knight.x += knight.speed * modifier;
	}
	
	if(
		ogre.x <= (princess.x + 32)
	   && princess.x <= (ogre.x + 32)
	   && ogre.y <= (princess.y + 32)
	   && princess.y <= (ogre.y +32)
	   ) {
		   ++princessCaught;
		   reset();
	   }
	if (
		princess.x <= (knight.x + 32)
		&& knight.x <= (princess.x +32)
		&& princess.y <= (knight.y + 32)
		&& knight.y <= (princess.y + 32)
		) {
			++knightCaught;
			reset();
		}
	if (
		knight.x <= (ogre.x + 32)
		&& ogre.x <= (knight.x +32)
		&& knight.y <= (ogre.y + 32)
		&& ogre.y <= (knight.y + 32)
		) {
			++ogreCaught;
			reset();
		}
};

//draw everything
var render = function() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	
	if (ogreReady) {
		ctx.drawImage(ogreImage, ogre.x, ogre.y);
	}
	if(princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}
	if(knightReady) {
		ctx.drawImage(knightImage, knight.x, knight.y);
	}
	
	//score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessCaught, 32, 32);
	ctx.fillText("Knights caught: " + knightCaught, 295, 32);
	ctx.fillText("Ogres caught: " + ogreCaught, 32, 420);
};

//the main game loop
var main = function() {
	if (princessCaught < 10  && knightCaught < 10 && ogreCaught < 10) {
	var now = Date.now();
	var delta = now - then;
	
	update(delta / 1000);
	render();
	
	then = now;
	
	requestAnimationFrame(main);
	}
	else if (princessCaught == 10) {
		ctx.fillText("Ogre wins!", 200, 200);
	}
	else if (knightCaught == 10) {
		ctx.fillText("Princess wins!", 200, 200);
	}
	else if (ogreCaught == 10) {
		ctx.fillText("Knight wins!", 200, 200);
	}
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame;

var then = Date.now();
reset();
main();