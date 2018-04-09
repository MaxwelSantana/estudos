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

}
