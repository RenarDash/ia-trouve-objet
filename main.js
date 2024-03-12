
modelstatus = "";

th = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}


function draw() {
    image(video, 0, 0, 480, 380);
    if (modelstatus != "") {
        coco.detect(video, gotresults);

        for (i = 0; i < th.length; i++) {
            document.getElementById("stats").innerHTML = "Object detective";
            objectName = th[i].label;
            objectFidence = floor(th[i].confidence * 100);
            owidth = th[i].width;
            oheight = th[i].height;
            oX = th[i].x;
            oY = th[i].y;

            r = random(255);
            g = random(255);
            b = random(255);
            if (objectName == objInput) {
                document.getElementById("NOO").innerHTML =objInput+" found";
                fill(r, g, b);
                text(objectName + " " + objectFidence + " %", oX + 10, oY + 10);
                noFill();
                strokeWeight(2)
                stroke(r, g, b);
                rect(oX, oY, owidth, oheight);
                video.stop();
                coco.detect(gotresults);
                speech=new SpeechSynthesisUtterance(objInput+" Found");
                window.speechSynthesis.speak(speech);
            }
            else{
                document.getElementById("NOO").innerHTML =objInput+" Not Found";
            }
        }
    }
}

function start() {
    coco = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("stats").innerHTML = "Object detective loading...";
    objInput = document.getElementById("objInput").value;
}

function modelLoaded() {
    console.log("model Loaded");
    modelstatus = true;
}

function gotresults(e, r) {
    if (e) {
        console.log(e);
    }
    else {
        console.log(r);
        th = r;
    }
}