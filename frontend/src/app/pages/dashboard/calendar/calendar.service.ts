import {Injectable} from '@angular/core';
import {BaThemeConfigProvider} from '../../../theme';
import {HttpClient} from '../../../services/httpService';
import {
  // Http,
  Response,
  // RequestOptions,
  // Headers,
  // Request,
  // RequestMethod
} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {BookingActivity} from '../../../models/Booking';

@Injectable()
export class CalendarService {
  http:HttpClient;
  activities: BookingActivity[] = [];
  params:string;
  start_date:number;
  end_date:number;
  events: BookingActivity[] = [];
  constructor(private _baConfig:BaThemeConfigProvider, httpClient: HttpClient) {
    this.http = httpClient;
    this.activities = new Array<BookingActivity>();
    this.activities = [];
    this.events = [];
  }
  getBookingActivity():Observable<BookingActivity>{
    this.params = "?start_date=2016-01-01&end_date=2017-12-31&client=web";
    return this.http.get("bookings/activity"+this.params)
         .map((res:Response) => res.json().activity)
         .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  }
  checkBackend():Observable<any>{
    return this.http.get("")
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  }
  // getData() {
  //   let dashboardColors = this._baConfig.get().colors.dashboard;
  //
  //   console.log(this.events);
  //   return this.events
  // }

}
