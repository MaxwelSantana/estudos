import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.css']
})
export class CalendarBodyComponent implements OnInit {

  @Input()
  days: any[];

  @Input()
  events: any[];
  
  constructor() { }

  ngOnInit() {
  }

  onChangeEventDay(event) {
    let ev = this.events.find(ev => ev.id == event.idEvent);
    ev.date = event.day.date;
    ev.order = event.order;
    this.events = this.events.slice();
  }
}
