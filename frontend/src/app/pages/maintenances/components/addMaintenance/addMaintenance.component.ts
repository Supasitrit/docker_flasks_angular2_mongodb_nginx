import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { maintenancesService } from '../maintenances.service';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { roomsService } from '../../../rooms/components/rooms.service';
/* Model */
import { CreateMaintenanceRequest } from '../../../../models/Maintenance';

@Component({
  template: require('./addMaintenance.html')
})
export class addMaintenance implements OnInit {
  newMaintenance: CreateMaintenanceRequest;
  errorMessage: string;
  foundRooms: any;
  filesToUpload: Array<File>;

  // public defaultPicture = 'assets/img/theme/no-photo.png';
  // public profile:any = {
  //   picture: 'assets/img/app/typography/typo06.png'
  // };
  // public uploaderOptions:any = {
  //   url: 'http://45.55.158.15/ams/maintenances'
  // };

  constructor(fb:FormBuilder, private _maintenancesService: maintenancesService, private router: Router,
      private roomsService: roomsService) {
    this.newMaintenance = new CreateMaintenanceRequest();
    // this.newMaintenance.photo = [];
  }
  error = false;

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.newMaintenance); }
  upload() {
      // this._maintenancesService.upload(this.filesToUpload);
  }
  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>> fileInput.target.files;
      console.log(this.filesToUpload);
      this.newMaintenance.photo = this.filesToUpload[0];
  }
  getRooms(){
    console.log("Status: Getting Rooms");
    this.roomsService.getRooms().subscribe(
      foundRooms => {
        this.foundRooms = foundRooms;
        console.log(foundRooms);
      }
    )
  }
  onSubmit() {
    this._maintenancesService.create(this.newMaintenance).subscribe(
            createMaintenanceResponse => {
              if(createMaintenanceResponse.success){
                //success
                console.log(createMaintenanceResponse);
                this.router.navigate(['pages/maintenances']);
              }else{
                //fail
                console.log(createMaintenanceResponse);
                this.error = true;
                this.errorMessage = createMaintenanceResponse.message;
              }
            },
            error =>  {
                console.log(error);
                this.error = true;
            }
        )
  }
  ngOnInit() {
    this.getRooms();
  }
}
