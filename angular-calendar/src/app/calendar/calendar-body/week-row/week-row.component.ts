import { Component, OnInit, Input } from '@angular/core';

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

  //events = [{clientName: 'Client 1', days: 4}, {clientName: 'Client 2', days: 2}];

  constructor() { }

  ngOnInit() {
  }

}
