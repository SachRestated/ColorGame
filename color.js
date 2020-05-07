var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var msgDisplay = document.querySelector("#msg");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn"); 
var hardBtn = document.querySelector("#hardBtn"); 
var levelHard = true;
var wrong = new Audio();
var correct = new Audio();

correct.src="correct.mp3"
wrong.src = "wrong.mp3";
wrong.volume = 0.3;
colorDisplay.textContent = pickedColor;

audioElement.addEventListener('timeupdate', function() {
    var t = audioElement.currentTime;
    if (t > audioElement.duration - 1.5) {
        audioElement.pause();
    }
};

easyBtn.addEventListener("click", function(){
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	colors = generateRandomColors(3)
	pickedColor = pickColor();
	msgDisplay.textContent = "";
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	levelHard = false;
	for(var i=0; i<colors.length; i++)
		squares[i].style.backgroundColor = colors[i];
	while(i < squares.length) {
		squares[i].style.display = "none";
		i++;
	}

})

hardBtn.addEventListener("click", function(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	colors = generateRandomColors(6)
	pickedColor = pickColor();
	msgDisplay.textContent = "";
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	levelHard = true;
	for(var i=0; i<colors.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}

	
})


resetButton.addEventListener("click", function() {
	//generate random colors
	//pick a new color from the array
	//change the colors of the sqaures
	msgDisplay.textContent = "";
	levelHard ? colors = generateRandomColors(6) : colors = generateRandomColors(3) ;
	pickedColor = pickColor();
	for(var i=0; i<colors.length; i++) {

	//add initial colors to sqaures
	squares[i].style.backgroundColor = colors[i];
    }
    while(i<squares.length) {
    	squares[i].style.display = "none";
    	i++;
    }

	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";

	if(this.textContent === "Play Again?")
		this.textContent = "New Colors"
})

for(var i=0; i<squares.length; i++) {

	//add initial colors to sqaures
	squares[i].style.backgroundColor = colors[i];

	// Add an event
	squares[i].addEventListener("click", function() {
		var clickedColor = this.style.backgroundColor;

		if(clickedColor !== pickedColor) {
			if(!wrong.ended) {
				wrong.load();
				wrong.play();
				setInterval(function() {});
				
			}
			else {
				wrong.play();
				setInterval(function() {});
			}
			this.style.backgroundColor = "#232323";
			msgDisplay.textContent = "Try Again";

		}

		else {

			if(!wrong.ended) {
				wrong.load();
				correct.play();
			}
			else 
				correct.play();
			msgDisplay.textContent = "Correct!";
			changeColor(pickedColor);
			h1.style.backgroundColor = pickedColor;
			resetButton.textContent = "Play Again?";
		}

	})

}

function changeColor(color) {
	for(var i=0; i<squares.length; i++) {
		squares[i].style.background = color; 
	}

}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length) ;
	return colors[random];
}

function generateRandomColors(num) {
	var arr = [];

	for(var i=0; i<num; i++)
		arr.push(randomColor());
	return arr
}

function randomColor() {
	var red = Math.floor(Math.random() * 256) ;
	var green = Math.floor(Math.random() * 256) ;
	var blue = Math.floor(Math.random() * 256) ;

	var col = "rgb(" + red + ", " + green + ", " + blue + ")";
	return col
}
