cocoStatus = "";
objects = [];

function preload() {

}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function Start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Searching Objects";
    object_name = document.getElementById("searchbar").value;
    if (object[i].label == object_name) {
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("status").innerHTML = object_name + " Found";
        synth = window.speechSynthesis;
        speak_data = "Object Mentioned Has Been Found!";
        utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    } else {
        document.getElementById("status").innerHTML = "Objects Mentioned Not Found"
    }
}

function modelLoaded() {
    console.log("Model loaded Successfully");
    cocoStatus = true;
}

function draw() {
    image(video, 0, 0, 640, 480);
    if (cocoStatus != "") {
        for (i = 0; i < objects.length; i++) {      
            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}