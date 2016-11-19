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
import { Room } from '../../../models/Room';
import { RoomDetail } from '../../../models/Room';

@Injectable()
export class roomsService {
  http:HttpClient;
  roomDetail:RoomDetail;
  showDetail:boolean;
  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
    this.showDetail = false;
  }

  getRoomDetail(name):Observable<RoomDetail>{
    // Query room by name
    return this.http.get("rooms/"+name)
         .map((res:Response) => res.json().room)
         .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  }
  findRoomByName(name){
    console.log("Status:  findRoomByName, Room name:  "+ name);
    this.getRoomDetail(name).subscribe(
      (values: RoomDetail) => {
        this.roomDetail = values;
        console.log(values);
      }
    )
    // Check if the showdetail is true, to enable the showdetail element
    if (!this.showDetail){ this.showDetail = true; }
  }
  getAvailableRooms(RoomAvailabilityRequest):Observable<Array<Room>>{
    let params = {
      "check_in": RoomAvailabilityRequest.check_in,
      "check_out": RoomAvailabilityRequest.check_out,
      "room_type": RoomAvailabilityRequest.room_type,
    }
    return this.http.get("rooms/availibity?"+
                          "check_in=" + params.check_in+
                          "&"+
                          "check_out=" + params.check_out+
                          "&"+
                          "room_type=" + params.room_type
                        )
                     .map((res:Response) => res.json().rooms)
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  getRooms():Observable<Array<Room>>{
      return this.http.get("rooms")
                       .map((res:Response) => res.json().rooms)
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  createRoom() {}

  editRoom() {}

}
