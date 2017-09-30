var song;
var volumeslider;
var playpausebtn;
var stopbtn;

var amp;

function preload() {
	song = loadSound('song.mp3');
}

function setup() {
	createCanvas(710,400);

	playpausebtn = createButton('play');
	
	stopbtn = createButton('stop');
	
	volumeslider = createSlider(0, 1, 0.5, 0.01);
	


	noFill();

	mic = new p5.AudioIn();
	mic.start();
	fft = new p5.FFT();
	fft.setInput(song);
}

function draw() {
	// background(51);

	// var vol = amp.getLevel();
	// var diam = map(vol, 0, 0.3, 10, 200);

	// fill(255, 0, 255);
	// ellipse(width / 2, height / 2, diam, diam);

	playpausebtn.mousePressed(playpausefn);
	stopbtn.mousePressed(stopfn);
	song.setVolume(volumeslider.value());

	background(200);

	var spectrum = fft.analyze();

	beginShape();
	for (i = 0; i<spectrum.length; i++) {
	vertex(i, map(spectrum[i], 0, 255, height, 0) );
	}
	endShape();
}

function playpausefn() {
	if(!song.isPlaying()) {
		song.play();
		playpausebtn.html('pause');
	}
	else {
		song.pause();
		playpausebtn.html('play');
	}
}

function stopfn() { 
	song.stop();
	playpausebtn.html('play');
}