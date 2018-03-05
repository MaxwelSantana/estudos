console.log("calendar.js");

var listViewContainerElement = document.querySelector(".view-container.list-view-container");

function changeCalendarView(elmnt, viewMode){
    if(elmntHasClass(elmnt.target,"totalcalview-selected"))
        return;

    enableLoading();

    setTimeout(function(){
        removeClassFromElements(".totalcal-view span", "totalcalview-selected");
        elmnt.target.classList.add("totalcalview-selected");
        if(viewMode)
            changeViewMode(viewMode);
        disableLoading();
    }, 800);
    
}

function changeViewMode(viewMode){
    removeClassFromElements(".view-container.active", "active");
    document.querySelector(".view-container." + viewMode + "-view-container")
        .classList.add("active");
}

function removeClassFromElements(query, classToRemove){
    document.querySelectorAll(query).forEach(el => el.classList.remove(classToRemove));
}

function enableLoading(){
    let elmnt = document.querySelector(".navigator-loading");
    if(elmntHasClass(elmnt, "active"))
        return;
    elmnt.classList.add("active");
}

function disableLoading(){
    document.querySelector(".navigator-loading").classList.remove("active");
}

function elmntHasClass(elmnt, desiredClass){
    if(!elmnt)
        return false;
    return elmnt.classList.contains(desiredClass);
}

function openDetail(){
    if(!listViewContainerElement)
        listViewContainerElement = document.querySelector(".view-container .list-view-container");
    listViewContainerElement.classList.add("open-detail");
}

function closeDetail(){
    listViewContainerElement.classList.remove("open-detail");
}