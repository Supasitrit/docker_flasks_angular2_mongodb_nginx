import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roomsService } from '../rooms.service';

@Component({
  template: require('./bookingHistory.html')
})
export class bookingHistory implements OnInit {
  constructor(private _roomsService: roomsService, private router: Router) {
  }
  ngOnInit() {
  }
}
