function getElDayByIndex(index){
    return document.querySelector('div[data-day-index="'+ index + '"]');
}

function getElEventsById(id){
    return document.querySelectorAll("#" + id);
}

function getElDaysByIdEvent(id) {
    return Array.from(document.querySelectorAll("#"+id)).map(function(event){
        return event.closest(".event-day");
    }).filter(function(eventDay) {
        return eventDay != null;
    });
}

function addAuxEvents(event, nextDay) {
    let days = event.dataset.eventDays;

    for(let count = 1;count < days; count++){
        let clnEvent = event.cloneNode(true);
        clnEvent.style.visibility = "hidden";
        clnEvent.style.width = "auto";
        fillDay(nextDay, clnEvent);
        nextDay++;
    }
}

function removeAuxEvents(event){
    let elmnts = document.querySelectorAll("#"+event.id);
    elmnts.forEach(function(elmnt){
        if(elmnt.style.visibility == "hidden")
            elmnt.remove();
    });
}

function isMonday(day){
    return (day % 7) == 1;
}

function fillDay(day, event){
    if(isMonday(day))
        event.style.visibility = "visible";
        
    elDay = getElDayByIndex(day);
    elDay.appendChild(event);
}

function fillDays(elDay, event){
    removeAuxEvents(event);

    hideMoreEvents();

    var days = event.dataset.eventDays;
    var day = elDay.dataset.dayIndex;

    fillDay(day, event);
    day++;
    
    addAuxEvents(event, day);

    reorderEventsByAllDays();
}

function reorderEventsByAllDays() {
    let allDays = Array.from(document.querySelectorAll('.event-day[data-day-index]:not(.event-day-modal)'));
    allDays.forEach(function(elDay) {
        let allEvents = reorderEvents(elDay);
        if(allEvents)
            setTotalEventsDay(elDay, allEvents.length);
    });
}

function setTotalEventsDay(elDay, totalEvents) {
    elDay.parentElement.dataset.totalEvents = totalEvents;
}

function reorderEvents(elDay) {
    //let events = Array.from(elDay.children);
    let events = Array.from(elDay.getElementsByClassName("event"));
    
    let mainEvents = events.filter(event => event.style.visibility != "hidden");

    let auxEvents = events.filter(event => event.style.visibility == "hidden");

    if(!mainEvents.length)
        return;

    mainEvents.sort(function(a, b){
        return b.dataset.eventDays - a.dataset.eventDays;
    });

    auxEvents.sort(function(a, b){
        return a.dataset.order - b.dataset.order;
    });

    let allEvents = fitEventsBeetweenBodyEvents(auxEvents, mainEvents);

    allEvents.sort(function(a, b){
        return b.dataset.order == a.dataset.order ? isAuxEvent(a) ? -1 : isAuxEvent(b) ? 1 : 0 : a.dataset.order - b.dataset.order;
    });

    return setEventsInOrder(allEvents);
}

function setEventsInOrder(events){
    let order = 1;
    return events.map(event => {
        if(!isAuxEvent(event)){
            event.dataset.order = order;
            setOrder(event, order);
        }
        order++;
        return event;
    });
}

function setOrder(event, order) {
    let events = getElEventsById(event.id);
    setOrders(events, order);
}

function setOrders(events, order) {
    events.forEach(function(event) {
        event.dataset.order = order;
    });
}

function isAuxEvent(event) {
    return event.style.visibility == "hidden";
}

function fitEventsBeetweenBodyEvents(auxEvents, events) {
    //let order = 1;
    let allEvents = [];
    let totalEvents = auxEvents.length + events.length;
    
    let possibleOrders = Array.apply(null, {length: totalEvents}).map((item, index)=> index+1);

    auxEvents.forEach(auxEvent => {
        let foundOrder = possibleOrders.find(pOrder => pOrder == auxEvent.dataset.order);
        possibleOrders.splice(possibleOrders.indexOf(foundOrder), 1);
        allEvents.push(auxEvent);
    });

    for(let i = 0;i < events.length;i++) {
        let order = possibleOrders.shift();
        events[i].dataset.order = order;
        allEvents.push(events[i]);
    }

    return allEvents;
}

function initialPositionEvents() {
    let allEvents = Array.from(document.querySelectorAll('.event'));
    allEvents.slice(0, 4).forEach(event => fillDays(getElDayByIndex(1), event));
    allEvents.slice(4, 8).forEach(event => fillDays(getElDayByIndex(10), event));
}

function showDetails(event) {
    removeClassAllElmnts("open-detail");
    event.target.classList.add("open-detail");
}

function closeDetails(event) {
    removeClassAllElmnts("open-detail");
}

function removeClassAllElmnts(classToRemove) {
    let details = document.querySelectorAll("."+classToRemove);
    details.forEach(detail => {
        detail.classList.remove(classToRemove);
    });
}

initialPositionEvents();