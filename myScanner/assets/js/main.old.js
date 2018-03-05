var scannerElement = document.getElementById('scanner');
var gCtx = null;
var gCanvas = null;
var front = false;

function flipCam(){
    front = !front; 
    start();
}

function start() {
    if (window.stream) {
        console.log(window.stream.getTracks());
    window.stream.getTracks().forEach(function(track) {
        track.stop();
    });
    }
    
    var constraints = { video: { facingMode: (front? "user" : "environment") } };

    navigator.mediaDevices.getUserMedia(constraints).
        then(gotStream).catch(handleError);
}

function gotStream(stream) {
    window.stream = stream; // make stream available to console
    scannerElement.srcObject = stream;
    
    scannerElement.onloadedmetadata = function(e) {
        scannerElement.play();
    };

    captureToCanvas();
}

function handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

/* ###################################################################################################### */

function initCanvas(w,h){
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h);
}

function captureToCanvas() {
    try{
        gCtx.drawImage(scannerElement,0,0);
        try{
            qrcode.decode();
 
            setTimeout(captureToCanvas, 500);
        }
        catch(e){       
            console.log(e);
            setTimeout(captureToCanvas, 500);
        };
    }
    catch(e){       
            console.log(e);
            setTimeout(captureToCanvas, 500);
    };
    //setTimeout(captureToCanvas, 5000);
}

function read(result){
    alert(result);
}
function load(){
    initCanvas(800, 600);
    qrcode.callback = read;
    start();
}

load();