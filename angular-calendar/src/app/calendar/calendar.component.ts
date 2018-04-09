import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as locales from 'moment/min/locales';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  today: any;
  days = [];
  currentMonth: string;
  events = [{name: 'Client 1', date: moment(), num: 1, id: 1}];

  constructor() { }

  ngOnInit() {
    moment.locale('en', {
      week : {
          dow : 1,
          doy : 4
      }
    });

    this.today = moment([2018, 2, 5]);

    this.fillDays();
  }

  onPreviousMonth() {
    this.today.subtract(1, "month");

    this.fillDays();
  }

  onNextMonth() {
    this.today.add(1, "month");

    this.fillDays();
  }

  fillDays() {
    this.days = [];

    let firstDayOfMonth = this.today.startOf('month');
    let dayOfWeek = firstDayOfMonth.weekday();

    let lastDayOfMonth = firstDayOfMonth.endOf('month');

    while(dayOfWeek != 0){
      this.days.push({
        num: moment(firstDayOfMonth).subtract(dayOfWeek, "day").date(), currentMonth: false
      });
      dayOfWeek--;
    }

    for(let i = 1; i <= lastDayOfMonth.date(); i++){
      this.days.push({
        num: i, currentMonth: true
      });
    }

    dayOfWeek = lastDayOfMonth.weekday();
    let count = 1;
    for(let i = dayOfWeek; i < 6;i++) {
      this.days.push({
        num: moment(lastDayOfMonth).add(count, "day").date(), currentMonth: false
      });
      count++;
    }

    this.updateCurrentMonth();
  }

  updateCurrentMonth(){
    this.currentMonth = this.today.format('MMMM YYYY');
  }
}
