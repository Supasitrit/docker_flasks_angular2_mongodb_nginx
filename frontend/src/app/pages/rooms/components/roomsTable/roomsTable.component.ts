import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roomsService } from '../rooms.service';
import { roomDetail } from '../roomDetail/roomDetail.component';

/*table*/
import { LocalDataSource } from 'ng2-smart-table';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'rooms-table',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./smartTables.scss')],
  template: require('./roomsTable.html')
})
export class roomsTable implements OnInit {
  foundRooms:any;
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: true,
      perPage: 10,
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    info: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      building:{
        title: 'Building',
        type: 'string'
      },
      room_number:{
        title: 'Room Name',
        type: 'string'
      },
      // name: {
      //   title: 'Name',
      //   type: 'string'
      // },
      // available: {
      //   title: 'Room Available',
      //   type: 'string'
      // },
    }
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private _roomsService: roomsService) {
  }
  onUserRowSelect(event){
    this.showDetails(event.data);
  }
  showDetails(room) {
    console.log("Status:  Show Detail (" + room.name + ")");
    this._roomsService.findRoomByName(room.name);
  }
  getRooms(){
    console.log("Status:  Getting rooms");
      this._roomsService.getRooms().subscribe(
        foundRooms => {
          this.foundRooms = foundRooms;
          console.log(foundRooms);
          this.source.load(this.foundRooms);
        }
      )
    // this._roomsService.findRoomByName(this.foundRooms[0].name);
  }
  ngOnInit() {
    this.getRooms();
  }
}
