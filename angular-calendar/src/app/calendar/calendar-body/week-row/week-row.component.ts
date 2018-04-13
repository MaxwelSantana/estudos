import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-week-row',
  templateUrl: './week-row.component.html',
  styleUrls: ['./week-row.component.css'],
  host: {'class': 'week-row'}
})
export class WeekRowComponent implements OnInit {

  @Input()
  days: number[];

  @Input()
  events: any[];

  @Output() onChangeEventDay: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeEventDay(event) {
    this.onChangeEventDay.emit(event);
  }
}
