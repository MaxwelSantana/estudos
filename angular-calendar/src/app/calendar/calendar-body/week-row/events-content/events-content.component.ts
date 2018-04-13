import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-events-content',
  templateUrl: './events-content.component.html',
  styleUrls: ['./events-content.component.css']
})
export class EventsContentComponent implements OnChanges {

  @Input()
  events: any[];

  @Input()
  day: any;

  @Output() onChangeEventDay: EventEmitter<any> = new EventEmitter();

  @ViewChild("elEventContent") elEventContent: ElementRef;

  @ViewChild("elEventDay") elEventDay: ElementRef;
  
  private mql: MediaQueryList;

  order: number = 1;
  eventsByDay: any[];
  showEvents: boolean = false;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshEventsByDay();
  }

  public drop(event) {
    event.preventDefault();
    event.stopPropagation();

    this.changeEventDay(event.dataTransfer.getData("Text"), this.day)
    console.log("drop", event.dataTransfer.getData("Text"));
  }

  public dragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  refreshEventsByDay() {
    this.eventsByDay = this.events.filter(ev => ev.date.isSame(this.day.date, 'day'));
    let order = 1;
    this.eventsByDay.forEach(function(event) {
      event.order = order;
      order++;
    });
    this.order = order;
  }

  changeEventDay(idEvent, day){
    this.onChangeEventDay.emit({idEvent, day, order: this.order});
    this.order++;
  }

  showMoreEvents(event){
    this.showEvents = true;
    
    this.elEventContent.nativeElement.classList.remove("hide-events");
    this.elEventContent.nativeElement.classList.add("show-events");
  }

  hideMoreEvents() {
    this.showEvents = false;

    let eventsModal = this.elEventContent.nativeElement.querySelectorAll(".event-day-modal");
    eventsModal.forEach(eventModal => eventModal.remove());

    this.elEventContent.nativeElement.classList.remove("show-events");
    this.elEventContent.nativeElement.classList.add("hide-events");
  }

  shouldShowMoreEvents() {
    if(window.matchMedia('(max-width: 481px)').matches)
      return this.eventsByDay.length > 1;
    else if(window.matchMedia('(max-width: 979px) and (min-width: 768px)').matches)
      return this.eventsByDay.length > 2;
    else if(window.matchMedia('(min-width: 979px)').matches)
      return this.eventsByDay.length > 3;
  }
}
