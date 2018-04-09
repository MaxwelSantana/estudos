import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input()
  event: any;

  showDetail: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public dragStart(event, ev) {
    event.dataTransfer.setData("Text", ev.id);
  }

  public showDetails(event) {
    this.showDetail = true;
  }

  public closeDetails(event) {
    this.showDetail = false;
  }
}
