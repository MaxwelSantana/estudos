import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './calendar/calendar-body/week-row/events-content/event/event.component';
import { EventsContentComponent } from './calendar/calendar-body/week-row/events-content/events-content.component';
import { WeekRowComponent } from './calendar/calendar-body/week-row/week-row.component';
import { DaysOfWeekComponent } from './calendar/calendar-body/days-of-week/days-of-week.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarBodyComponent } from './calendar/calendar-body/calendar-body.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventComponent,
    EventsContentComponent,
    WeekRowComponent,
    DaysOfWeekComponent,
    CalendarHeaderComponent,
    CalendarBodyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
