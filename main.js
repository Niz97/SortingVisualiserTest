var canvas;
var ctx;
var grid;
var maxHeight = 9;

// when the window loads
window.addEventListener('load', function() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	// change properties of individual rectangles
	// request animation frame - https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
	
	// generate 10 x 10 grid with 60 spacing
	// choose 60 because our canvas is 600 x 600
	grid = createGrid(10, 60);

	// given an array [5, 2, 8 , 9, 2]
	// this should be drawn as a vertical bar to the screen

	draw();
	
});


class Rectangle {
	constructor(x, y, height, width, colour) {
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
		this.colour = colour;
	}
};


function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
};



function drawRec(Rectangle) {
	ctx.fillStyle = Rectangle.colour;
	ctx.fillRect(Rectangle.x, Rectangle.y, Rectangle.width, Rectangle.height);
	ctx.strokeStyle = Rectangle.colour;
    //ctx.strokeRect(Rectangle.x, Rectangle.y, Rectangle.width, Rectangle.height);

 		// ctx.beginPath();
   //  	ctx.rect(Rectangle.x, Rectangle.y, Rectangle.width, Rectangle.height);
   //  	ctx.stroke();
    	
};

// this function should only create the grid
// and populate it with empty white rectangles
function createGrid(size, spacing) {
	// create grid
	var rectArray = Create2DArray(size);

	// populate grid with "empty" rectangle objects
	for (var x = 0; x < size; x++){
		for (var y = 0; y < size; y++) {
			var col = y * spacing;
			var row = x * spacing;
			var white = "white";
			//var randomColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
			rectArray[y][x] = new Rectangle(col, row, spacing, spacing, white);
		}
	}
	return rectArray;
}

function drawGrid(size, grid) {
	for (var x = 0; x < size; x++){
		for (var y = 0; y < size; y++){
			drawRec(grid[x][y]);
		}
	}
}

// change the colour of any given rectangle
function changeColour(grid, x, y) {
	//grid[x][y].colour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	grid[x][y].colour = "blue";
	
}

// given an int array, draw these values as "bars"
// to the canvas with the given height.
function drawBar(grid, barX, barHeight, colour) {
	for (var i = 0; i < barHeight; i++) {
		for (var y = maxHeight; y > i; y--){
			grid[barX][maxHeight - i].colour = colour;
		}
	}
}

function drawBarsFromArray(array) {
	for (var i = 0; i < array.length; i++) {
		drawBar(grid, i, array[i], "red");
	}
}



// draw loop
function draw(){

	var randX = Math.floor(Math.random() * 10);
	var randY = Math.floor(Math.random() * 10);
	document.getElementById("btnChangeColour").onclick = function() {changeColour(grid, randX, randY)};
	
	// drawBar(grid, 1, 7, "blue");
	// drawBar(grid, 2, 8, "red");
	drawBarsFromArray([5, 3, 8, 4]);

	// draw out grid to screen
	drawGrid(10, grid);


	requestAnimationFrame(draw);
}
