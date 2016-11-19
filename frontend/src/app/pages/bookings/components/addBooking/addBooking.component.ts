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
  template: require('./addbooking.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./smartTables.scss'),
    require('./selectInput.scss')
  ],
})
export class addBooking implements OnInit {
  newBooking: CreateBookingRequest;
  foundCustomers: any;
  selectedCustomers: Customer[] = [];
  foundRooms: any;
  errorMessage:string;

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
    this.newBooking.check_in = null;
    this.newBooking.check_out = null;
    this.newBooking.customer_ids = "";
    this.newBooking.confirmed = this.checkboxModel[0].checked;
  }
  error = false;

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.newBooking); }
  get diagnostic2() { return JSON.stringify(this.selectedCustomers); }

  onConfirmedChange(){
    console.log(this.checkboxModel[0].checked);
    this.newBooking.confirmed = this.checkboxModel[0].checked;
  }
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
    console.log(this.newBooking);
    // POST
    this._bookingsService.create(this.newBooking).subscribe(
            createbookingResponse => {
              if(createbookingResponse.success){
                console.log(createbookingResponse);
                this.router.navigate(['pages/bookings']);
              }else{
                console.log(createbookingResponse.message);
                this.errorMessage = createbookingResponse.message;
                this.error = true;
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
  //selete customer
  onUserRowSelect(event): void {
    console.log(event.data.customer_id);
    // this.shareService.currentCustomer = event.data;
    // check duplicate
    if(!this.isDuplicate(event.data.customer_id, this.selectedCustomers)){
      // add to customer id array
      this.selectedCustomers.push(event.data);
    }else{
      // don't add
      console.log("the id is already inside the array");
    }
  }
  deleteFromSelectedCustomers(index) {
    console.log(index);
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
    this.getAvailableCustomers();
  }
}
