import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bookingsService } from '../bookings.service';
import { shareService } from '../../../../services/shareService';

import { ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'bookings-table',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./smartTables.scss')],
  template: require('./bookingsTable.html')
})
export class bookingsTable implements OnInit {
  foundBookings:any;
  foundBookingDetail:any;
  showBookingDetail:boolean;
  source: LocalDataSource = new LocalDataSource();

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
      room_name: {
        title: 'Room',
        type: 'string'
      },
      check_in: {
        title: 'Check In',
        type: 'string'
      },
      check_out: {
        title: 'Check Out',
        type: 'string'
      },
      // customer_state: {
      //   title: 'Checkout',
      //   type: 'string'
      // },
      confirmed: {
        title: 'Confirm Status',
        type: 'string'
      },
      // customers.length: {
      //   title: '# of Customers',
      //   type: 'string'
      // },
    }
  };

  constructor(private _bookingsService: bookingsService, private router:Router,
            private shareService:shareService) {
    this.showBookingDetail = false;
  }
  onUserRowSelect(event): void {
    // console.log(event.data.customer_id);
    // this.shareService.currentCustomer = event.data;
    this.getBookingDetails(event.data);
  }
  confirmedStatus(status){
    if(status){
      //confirmed
      return "primary"
    }else{
      //not confirmed
      return "danger"
    }
  }
  goToAddBooking(){
      this.router.navigate(['pages/bookings/add']);
  }
  goToEditBooking(booking){
      this.shareService.currentBooking = booking;
      this._bookingsService.editingBooking = true;
      console.log(booking);
      this.router.navigate(['pages/bookings/edit']);
  }
  getBookingDetails(booking) {
    this.showBookingDetail = true;
    console.log("Status:  Go to Detail (" + booking.booking_id + ")");
    this._bookingsService.getBookingDetail(booking.booking_id).subscribe(
      foundBookingDetail => {
        this.foundBookingDetail = foundBookingDetail;
        console.log("foundBookingDetail");
        console.log(foundBookingDetail);
      }
    )
  }
  confirmedToString(confirm){
    confirmStatus:string;
    if(confirm){
      confirmStatus = "yes";
    }else{
      confirmStatus = "no";
    }
    return confirmStatus;
  }
  getBookings(){
    console.log("Status:  Getting bookings");
      this._bookingsService.getBookings().subscribe(
        foundBookings => {
          this.foundBookings = foundBookings;
          console.log(foundBookings);
          for(var i=0;i<this.foundBookings.length;i++){
            this.foundBookings[i].check_in = this.foundBookings[i].check_in.substring(0,10);
            this.foundBookings[i].check_out = this.foundBookings[i].check_out.substring(0,10);
            this.foundBookings[i].confirmed = confirmedToString(this.foundBookings[i].confirmed);
          }
          this.source.load(this.foundBookings);
        }
      )
  }
  askConfirmDelete(){
    this.shareService._askConfirmDelete = true;
  }
  deleteBooking(booking_id){
    this._bookingsService.delete(booking_id).subscribe(
            deleteBookingResponse => {
              console.log(deleteBookingResponse);
              window.alert("Delete successful");
              location.reload();
              this.router.navigate(['pages/bookings']);
            },
            error =>  {
                console.log(error);
            }
        )
  }
  ngOnInit() {
    this.getBookings();
  }
}
