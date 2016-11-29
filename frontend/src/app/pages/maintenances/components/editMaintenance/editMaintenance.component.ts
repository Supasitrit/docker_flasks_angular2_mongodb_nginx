import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { maintenancesService } from '../maintenances.service';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { shareService } from '../../../../services/shareService';
import { roomsService } from '../../../rooms/components/rooms.service';
/* Model */
import { EditMaintenanceRequest } from '../../../../models/Maintenance';

@Component({
  template: require('./editMaintenance.html')
})
export class editMaintenance implements OnInit {
  editMaintenance: EditMaintenanceRequest;
  errorMessage: string;
  foundRooms: any;
  filesToUpload: Array<File>;
  defaultPicture: any;


  // public defaultPicture = 'assets/img/theme/no-photo.png';
  //
  // public uploaderOptions:any = {
  //   // url: 'http://website.com/upload'
  // };

  constructor(fb:FormBuilder, private _maintenancesService: maintenancesService, private router: Router,
    private shareService: shareService, private roomsService:roomsService) {
    this.editMaintenance = new EditMaintenanceRequest();
    if(this.shareService.currentMaintenance){
      console.log(shareService.currentMaintenance);
      this.editMaintenance.maintenance_id = shareService.currentMaintenance.maintenance_id;
      this.editMaintenance.created_at = shareService.currentMaintenance.created_at.substring(0,10);
      this.editMaintenance.title = shareService.currentMaintenance.title;
      this.editMaintenance.cost = shareService.currentMaintenance.cost;
      this.defaultPicture = shareService.currentMaintenance.image;
      // this.linkToFile(shareService.currentMaintenance.image);
      this.editMaintenance.room_name = shareService.currentMaintenance.room_name;
    }
  }
  error = false;

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.editMaintenance); }

  protected _changePicture(file:File):void {
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      this.defaultPicture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>> fileInput.target.files;
      console.log(this.filesToUpload);
      this.editMaintenance.photo = this.filesToUpload[0];
      // this.defaultPicture = this.editMaintenance.photo;
      this._changePicture(this.filesToUpload[0]);
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
    this._maintenancesService.update(this.editMaintenance).subscribe(
            editMaintenanceResponse => {
              if(editMaintenanceResponse.success){
                console.log(editMaintenanceResponse);
                this.router.navigate(['pages/maintenances']);
              }else{
                this.error = true;
                this.errorMessage = editMaintenanceResponse.message;
              }
            },
            error =>  {
                console.log(error);
                this.error = true;
            }
        )
  }
  ngOnInit() {
    if(!this.shareService.currentMaintenance){
      this.router.navigate(['pages/maintenances']);
    }
    this.getRooms();
  }
}
