import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roomsService } from '../rooms.service';

@Component({
  selector: 'room-detail',
  template: require('./roomDetail.html')
})
export class roomDetail implements OnInit {
  _showBookingHistory: boolean;
  _showMaintenanceHistory: boolean;
  constructor(private _roomsService: roomsService, private router: Router) {
    this._showBookingHistory = false;
  }
  toggleBookingHistory(){
    if(this._showBookingHistory){
      // true
      this._showBookingHistory = false;
    }else{
      this._showBookingHistory = true;
    }
  }
  toggleMaintenanceHistory(){
    if(this._showMaintenanceHistory){
      // true
      this._showMaintenanceHistory = false;
    }else{
      //false
      this._showMaintenanceHistory = true;
    }
  }
  confirmedStatus(status){
    if(status){
      //confirmed
      return "primary"
    }else{
      //not confirmed'
      return "danger"
    }
  }
  ngOnInit() {
  }
}
