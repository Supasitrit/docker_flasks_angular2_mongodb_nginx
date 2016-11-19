import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {CalendarService} from './calendar.service';
import {BookingActivity} from '../../../models/Booking';
@Component({
  selector: 'calendar',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./calendar.scss')],
  template: require('./calendar.html')
})
export class Calendar {

  public calendarConfiguration:any;
  private _calendar:Object;
  activities: BookingActivity[] = [];

  constructor(private _calendarService:CalendarService) {}
  getData() {
    this._calendarService.getBookingActivity().subscribe(
      (values: any) => {
        this.activities = values;
        console.log(this.activities);
        this.calendarConfiguration =
        {
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          // defaultDate: '2016-01-01',
          selectable: false,
          selectHelper: true,
          editable: false,
          eventLimit: true,
          events: this.activities
        };
        console.log(this.calendarConfiguration);
        // this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
      }
    )

  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.activities); }

  public onCalendarReady(calendar):void {
    this._calendar = calendar;
  }
  ngOnInit(){
    this.getData();
    this._calendarService.checkBackend().subscribe(
      (values: any) => {
        console.log("Backend status");
        console.log(values);
      }
    )
  }
  // private _onSelect(start, end):void {
  //   if (this._calendar != null) {
  //     let title = prompt('Event Title:');
  //     let eventData;
  //     if (title) {
  //       eventData = {
  //         title: title,
  //         start: start,
  //         end: end
  //       };
  //       jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
  //     }
  //     jQuery(this._calendar).fullCalendar('unselect');
  //   }
  // }
}
