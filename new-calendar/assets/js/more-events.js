function showMoreEvents(event){
    let elEventsContent = event.target.closest(".events-content");
    let elEventDay = elEventsContent.querySelector(".event-day");

    let modalEventDay = elEventDay.cloneNode(true);
    modalEventDay.classList.add("event-day-modal");

    elEventsContent.appendChild(modalEventDay);
    
    event.target.closest(".events-content").classList.remove("hide-events");
    event.target.closest(".events-content").classList.add("show-events");
}

function hideMoreEvents() {

    let eventsModal = document.querySelectorAll(".event-day-modal");
    eventsModal.forEach(eventModal => eventModal.remove());

    let showEvents = document.querySelectorAll(".events-content.show-events");
    showEvents.forEach(el => {
        el.classList.remove("show-events");
        el.classList.add("hide-events");
    });
}