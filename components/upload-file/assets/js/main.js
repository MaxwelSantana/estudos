var input = document.getElementById("upload-file");

function upload(){
    input.click();
}

function onFileChange(){

}

document.addEventListener("dragover", function(event){
    event.preventDefault();
});

document.addEventListener("dragenter", function(event){
    event.preventDefault();
    if(event.target.className.match("drop"))
        event.target.classList.add("drag-over");
});

document.addEventListener("dragleave", function(event){
    event.preventDefault();
    if(event.target.className.match("drop"))
        event.target.classList.remove("drag-over");
});

document.addEventListener("drop", function(event){
    event.preventDefault();
    event.stopPropagation();

    let files = event.dataTransfer.files;
    console.log("drop",files);
});