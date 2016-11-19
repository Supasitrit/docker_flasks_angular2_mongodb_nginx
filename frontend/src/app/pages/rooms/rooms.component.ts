import {Component} from '@angular/core';
import { roomsService } from './components/rooms.service';
@Component({
  selector: 'rooms',
  styles: [],
  template: require('./rooms.html')
})
export class rooms {
  constructor(private _roomsService: roomsService) {}
}
