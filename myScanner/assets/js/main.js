var scannerElement = document.getElementById('scanner');
var overlayElement = document.getElementById('overlay');
var albumElement = document.getElementsByClassName("icon-album")[0];
var inputFileElement = document.getElementById("chooseFile");
//var customScannerElement = document.getElementsByClassName("custom-scanner")[0];
var recentsElement = document.getElementsByClassName("app__recents")[0];
var appHeaderElement = document.getElementsByClassName("app__header")[0];
var recentListElement = document.getElementsByClassName("recents-list")[0];
var modalElement = document.getElementById("myModal");
var gCtx = null;
var gCanvas = null;
var front = false;
var uploadedImg = null;
var divBodyClickElement = null;
var spanRecentItemElement = null;
var recentList = [];
var idRecentItemControl = 1;
recentList.push({id:1, title: "QR Code", content: "Teste1"});
var qr = QCodeDecoder();

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
        overlayElement.classList.remove("camera-loading");
    };
}

function handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

/* ###################################################################################################### */

function read(err, result){
    if (err) return;
    addQrResultToList(result);
}
function load(){
    qr.decodeFromVideo(scannerElement, read);
    start();
}

/* ###################################################################################################### */

function createImg(){
    uploadedImg = document.createElement("img");
    uploadedImg.src = "";
    uploadedImg.id = "uploadedImg";
}

albumElement.addEventListener("click", function(e){
    createImg();
    //customScannerElement.style.display = "none";
    inputFileElement.click();
});

inputFileElement.addEventListener("change", function(e){
    if(e.target && e.target.files.length > 0){
        uploadedImg.src = URL.createObjectURL(e.target.files[0]);
        qr.decodeFromImage(uploadedImg, read);
        //customScannerElement.style.display = "block";
    }
});

/* ###################################################################################################### */

function createDivBodyClick(){
    divBodyClickElement = document.createElement("div");
    divBodyClickElement.id = "bodyClick";
    divBodyClickElement.addEventListener("click", function(e){
        appHeaderElement.classList.remove("recents-open");
        e.target.remove();
    });
    document.getElementsByTagName("body")[0].appendChild(divBodyClickElement);   
}

function createSpanRecentItem(id, content){
    spanRecentItemElement = document.createElement("span");
    spanRecentItemElement.classList.add("recent-item");
    spanRecentItemElement.dataset.id = id;
    spanRecentItemElement.innerHTML = content;
    spanRecentItemElement.addEventListener("click", openModal);
    recentListElement.appendChild(spanRecentItemElement);
    spanRecentItemElement = null; 
}

function toogleRecents(){
    appHeaderElement.classList.toggle("recents-open");
    if(appHeaderElement.classList.contains("recents-open"))
        createDivBodyClick();
}

function addQrResultToList(content){
    //recentList.push({content, obj: JSON.parse(content)});
    idRecentItemControl = idRecentItemControl + 1;
    let item = {id: idRecentItemControl, title: "QR Code", content};
    recentList.push(item);
    createSpanRecentItem(idRecentItemControl, content);
    openModalRecentItem(item);
}

/* ###################################################################################################### */

function openModal(element){
    let elementId = element.target.dataset.id;
    let foundItem = recentList.find(function(item){
        return item.id == elementId;
    });

    openModalRecentItem(foundItem);
}

function openModalRecentItem(recentItem){
    buildModal(recentItem.title, recentItem.content);
    modalElement.classList.add("modal-opened");
}

function buildModal(title, content){
    let titleModal = modalElement.querySelector(".modal-header .title");
    let contentModal = modalElement.querySelector(".modal-body p");

    titleModal.innerHTML = title;
    contentModal.innerHTML = content;
}

function closeModal(){
    modalElement.classList.remove("modal-opened");
}

load();