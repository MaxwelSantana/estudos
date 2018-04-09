import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-events-content',
  templateUrl: './events-content.component.html',
  styleUrls: ['./events-content.component.css']
})
export class EventsContentComponent implements OnInit {

  @Input()
  events: any[];

  @Input()
  day: any;

  order: number = 1;
  eventsByDay: any[];
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
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
    this.eventsByDay = this.events.filter(ev => ev.num == this.day.num);
    let order = 1;
    this.eventsByDay.forEach(function(event) {
      event.order = order;
      order++;
    });
    this.order = order;
  }

  changeEventDay(idEvent, day) {
    let event = this.events.find(ev => ev.id == idEvent);
    event.num = day.num;
    event.order = this.order;
    this.order++;
  }
}
