import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.css']
})
export class CalendarHeaderComponent implements OnInit {

  @Input("currentMonth")
  currentMonth: string;

  @Output() onPreviousMonth: EventEmitter<any> = new EventEmitter();

  @Output() onNextMonth: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  previousMonth() {
    this.onPreviousMonth.emit(null);
  }

  nextMonth() {
    this.onNextMonth.emit(null);
  }
}
