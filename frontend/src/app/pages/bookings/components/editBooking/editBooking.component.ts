import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/*Custom Services*/
import { bookingsService } from '../bookings.service';
import { customersService } from '../../../customers/components/customers.service';
import { roomsService } from '../../../rooms/components/rooms.service';
import { shareService } from '../../../../services/shareService';

/* Model */
import { CreateBookingRequest } from '../../../../models/Booking';
import { Customer } from '../../../../models/Customer';
/* table */
import { LocalDataSource } from 'ng2-smart-table';
import { ViewEncapsulation } from '@angular/core';

@Component({
  // selector: 'addbooking',
  template: require('./editbooking.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./smartTables.scss'),
    require('./selectInput.scss')
  ],
})
export class editBooking implements OnInit {
  newBooking: CreateBookingRequest;
  foundCustomers: any;
  selectedCustomers: Customer[] = [];
  foundRooms: any;
  errorMessage: string;

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: true,
      perPage: 5,
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
      name: {
        title: 'Name',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      },
    }
  };

  public checkboxModel = [{
    name: 'Confirmed',
    checked: false,
    class: 'col-md-4'
  }];

  public checkboxPropertiesMapping = {
    model: 'checked',
    value: 'name',
    label: 'name',
    baCheckboxClass: 'class'
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(fb:FormBuilder, private _bookingsService: bookingsService, private router: Router,
    private shareService: shareService, private customersService: customersService, private roomsService: roomsService) {
    this.newBooking = new CreateBookingRequest();
    console.log(this.shareService.currentBooking);

    // get the editing booking attributes
    this.newBooking.booking_id = this.shareService.currentBooking.booking_id;
    this.newBooking.check_in = this.shareService.currentBooking.check_in;
    this.newBooking.check_out = this.shareService.currentBooking.check_out;
    this.newBooking.confirmed = this.shareService.currentBooking.confirmed;
    this.newBooking.deposit = this.shareService.currentBooking.deposit;
    this.newBooking.ppm = this.shareService.currentBooking.ppm;
    this.newBooking.room_name = this.shareService.currentBooking.room_name;
    this.newBooking.room_type = this.shareService.currentBooking.room_type;
    this.checkboxModel[0].checked = this.newBooking.confirmed;
    // this.newBooking.customer_ids = [];
    for(var i=0;i<this.shareService.currentBooking.customers.length;i++){
      this.selectedCustomers.push(this.shareService.currentBooking.customers[i]);
    }
    this.selectedCustomers = this.shareService.currentBooking.customers;
  }
  error = false;
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.newBooking); }

  onchange(event): void{
    this.foundRooms = [];
  }

  onSubmit() {
    // convert all selected customers id into string
    for(var i=0; i<this.selectedCustomers.length;i++){
      // console.log(this.selectedCustomers[i].customer_id);
      this.newBooking.customer_ids = this.newBooking.customer_ids +
                                this.selectedCustomers[i].customer_id
                                + ",";
    }
    // checkbox confirm?
    this.newBooking.confirmed = this.checkboxModel[0].checked;
    console.log("Status:  CONFIRMED");
    console.log(this.newBooking.confirmed);
    console.log(this.newBooking);
    // PUT
    this._bookingsService.update(this.newBooking).subscribe(
            editbookingResponse => {
              if(editbookingResponse.success){
                console.log(editbookingResponse);
                this.router.navigate(['pages/bookings']);
              }else{
                this.error = true;
                this.errorMessage = editbookingResponse.message;
              }
            },
            error =>  {
                console.log(error);
                this.error = true;
            }
        )
  }
  isDuplicate(id, array:Customer[]) {
    var isDuplicate: boolean;
    var arrayOfSelectedCustomers;
    arrayOfSelectedCustomers = array;
    console.log(array);
    for(var i=0;i<arrayOfSelectedCustomers.length;i++){
      if(id == arrayOfSelectedCustomers[i].customer_id){
        // duplicate
        console.log("duplicate");
        isDuplicate = true;
      }
    }
    return isDuplicate;
  }
  onUserRowSelect(event): void {
    console.log(event.data.customer_id);
    this.shareService.currentCustomer = event.data;
    // check duplicate
    if(!this.isDuplicate(event.data.customer_id, this.selectedCustomers)){
      // add to customer id array
      // this.newBooking.customer_ids.push(event.data.customer_id);
      this.selectedCustomers.push(event.data);
    }else{
      // don't add
      console.log("the id is already inside the array");
    }
  }
  deleteFromSelectedCustomers(index) {
    console.log(index);
    // this.newBooking.customer_ids.splice(index, 1);
    this.selectedCustomers.splice(index, 1);
  }
  getAvailableRooms(){
    let RoomAvailabilityRequest = {
      "check_in": this.newBooking.check_in,
      "check_out": this.newBooking.check_out,
      "room_type": this.newBooking.room_type,
    }
    console.log("Status: Getting Rooms");
    this.roomsService.getAvailableRooms(RoomAvailabilityRequest).subscribe(
      foundRooms => {
        this.foundRooms = foundRooms;
        console.log(foundRooms);
      }
    )
  }
  getAvailableCustomers(){
    console.log("Status:  Getting customers");
      this.customersService.getcustomers().subscribe(
        foundCustomers => {
          this.foundCustomers = foundCustomers;
          console.log(foundCustomers);
          this.source.load(this.foundCustomers);
        }
      )
  }
  ngOnInit() {
    if(this.shareService.currentBooking == null){
      this.router.navigate(['pages/bookings']);
    }
    this.getAvailableCustomers();
  }
}
