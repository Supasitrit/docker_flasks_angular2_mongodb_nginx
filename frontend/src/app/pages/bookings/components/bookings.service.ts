import { Injectable } from '@angular/core';
import {
  // Http,
  Response,
  // RequestOptions,
  // Headers,
  // Request,
  // RequestMethod
} from '@angular/http';
import {Observable} from 'rxjs/Rx';
// import { Http, Headers } from '@angular/http';
/* Services */
import { HttpClient } from '../../../services/httpService';

/* Models */
import { Booking } from '../../../models/Booking';


@Injectable()
export class bookingsService {
  http:HttpClient;
  editingBooking:boolean;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
    this.editingBooking = false;
  }
  public getBookingDetail(id):Observable<any>{
    return this.http.get("bookings/"+id)
                      .map((res:Response) => res.json().booking)
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getBookings():Observable<Array<Booking>>{
      return this.http.get("bookings")
                       .map((res:Response) => res.json().bookings)
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  delete(booking_id){
    return this.http.delete("bookings/"+booking_id)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  create(CreateBookingRequest){
    let params = {
      "check_in" : CreateBookingRequest.check_in,
      "check_out": CreateBookingRequest.check_out,
      "deposit": CreateBookingRequest.deposit,
      "ppm": CreateBookingRequest.ppm,
      "customer_ids": CreateBookingRequest.customer_ids,
      "room_name": CreateBookingRequest.room_name,
      "room_type": CreateBookingRequest.room_type,
      "confirmed": CreateBookingRequest.confirmed
    }
    console.log(CreateBookingRequest);
    return this.http.post("bookings", params)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  update(EditBookingRequest){
    let params = {
      "check_in" : EditBookingRequest.check_in,
      "check_out": EditBookingRequest.check_out,
      "deposit": EditBookingRequest.deposit,
      "ppm": EditBookingRequest.ppm,
      "customer_ids": EditBookingRequest.customer_ids,
      "room_name": EditBookingRequest.room_name,
      "room_type": EditBookingRequest.room_type,
      "confirmed": EditBookingRequest.confirmed
    }
    console.log("CONFIRMED");
    console.log(params.confirmed);
    console.log(EditBookingRequest);
    return this.http.put("bookings/"+EditBookingRequest.booking_id, params)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
