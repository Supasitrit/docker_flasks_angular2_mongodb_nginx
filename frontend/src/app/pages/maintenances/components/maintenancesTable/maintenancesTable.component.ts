import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { maintenancesService } from '../maintenances.service';
import { shareService } from '../../../../services/shareService';

/*table*/
import { ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'maintenances-table',
  template: require('./maintenancesTable.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./smartTables.scss')],
})
export class maintenancesTable implements OnInit {
  foundmaintenances:any;
  error: boolean;
  errorMessage: string;
  showImage: boolean;
  imageUrl: string;
  maintenanceTitle: string;
  maintenanceRoomName: string;
  source: LocalDataSource = new LocalDataSource();

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: true,
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
      room_name: {
        title: 'Room',
        type: 'string'
      },
      created_at: {
        title: 'Created on',
        type: 'string'
      },
      title: {
        title: 'Title',
        type: 'string'
      },
      cost: {
        title: 'Cost',
        type: 'string'
      }
    }
  };

  constructor(private _maintenancesService: maintenancesService, private router: Router, private shareService: shareService) {
    this.shareService._askConfirmDelete = false;
  }

  onUserRowSelect(event): void {
    this.shareService.currentMaintenance = event.data;
    this.changeImage(event.data.image);
    this.maintenanceTitle = event.data.title;
    this.maintenanceRoomName = event.data.room_name;
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      // console.log(event.data.maintenance_id);
      event.confirm.resolve(this.delete(event.data.maintenance_id));
    } else {
      event.confirm.reject();
    }
  }
  changeImage(url){
    // if (this.showImage){
    //   this.showImage = false;
    // }else{
    //   this.showImage = true;
    // }\
    this.showImage = true;
    this.imageUrl = url;
  }
  goToEditMaintenance(){
    // this.shareService.currentMaintenance = maintenance;
    this.router.navigate(['pages/maintenances/edit']);
  }
  goToAddMaintenance(){
    this.router.navigate(['pages/maintenances/add']);
  }
  goToDetails(maintenance) {
    console.log("Status:  Go to Detail (" + maintenance.name + ")");
  }
  getMaintenances(){
    console.log("Status:  Getting maintenances");
      this._maintenancesService.getmaintenances().subscribe(
        foundmaintenances => {
          if(foundmaintenances){
            this.foundmaintenances = foundmaintenances;
            console.log(foundmaintenances);
            if(this.foundmaintenances[0]){
              this.changeImage(this.foundmaintenances[0].image);
              this.shareService.currentMaintenance = foundmaintenances[0];
              this.maintenanceTitle = this.shareService.currentMaintenance.title;
              this.maintenanceRoomName = this.shareService.currentMaintenance.room_name;
            }
            for(var i=0;i<this.foundmaintenances.length;i++){
              this.foundmaintenances[i].created_at = this.foundmaintenances[i].created_at.substring(0,10);
            }
            this.source.load(this.foundmaintenances);
          }
        }
      )
  }
  delete(maintenance_id){
    this._maintenancesService.delete(maintenance_id).subscribe(
            deleteMaintenanceResponse => {
              if(deleteMaintenanceResponse.success){
                console.log(deleteMaintenanceResponse);
                this.maintenanceTitle = null;
                this.maintenanceRoomName = null;
                this.imageUrl = null;
                this.showImage = false;
                this.router.navigate(['pages/maintenances']);
                window.alert("Successfully deleted the maintenance record");
              }else{
                this.error = true;
                this.errorMessage = deleteMaintenanceResponse.message;
              }
            },
            error =>  {
                console.log(error);
            }
        )
  }
  ngOnInit() {
    this.getMaintenances();
  }
}
