import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { customersService } from '../customers.service';
import { shareService } from '../../../../services/shareService';
import { ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'customers-table',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./smartTables.scss')],
  template: require('./customersTable.html')
})
export class customersTable {
  foundCustomers:any;
  query: string = '';

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
      name: {
        title: 'Name',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      },
      phone: {
        title: 'Phone',
        type: 'string'
      },
      customer_state: {
        title: 'Customer state',
        type: 'string'
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor( private _customersService: customersService, private router: Router, private shareService: shareService) {
    this.shareService.hideCustomerList = false;
  }
  deleteCustomer(customer_id){
    this._customersService.delete(customer_id).subscribe(
            deleteCustomerResponse => {
              console.log(deleteCustomerResponse);
              this.router.navigate(['pages/customers']);
            },
            error =>  {
                console.log(error);
            }
        )
  }
  goToAddCustomer(){
    this.router.navigate(['pages/customers/add']);
  }
  showCustomerList(){
    this.shareService.hideCustomerList = false;
    this.shareService.showCustomerDetail = false;
  }
  showDetails(customer_id) {

    // show customer detail panel
    this.shareService.showCustomerDetail = true;

    // // hide customer list
    // this.shareService.hideCustomerList = true;

    // show confirm delete
    this.shareService._askConfirmDelete = false;

    console.log("Status:  Show Detail (" + customer_id + ")");

    // set current customer id
    this.shareService.currentCustomerId = customer_id;

    // get customer info using id
    this._customersService.findCustomerById(customer_id);
  }
  getcustomers(){
    console.log("Status:  Getting customers");
      this._customersService.getcustomers().subscribe(
        foundCustomers => {
          for(var i=0;i<foundCustomers.length;i++){
            foundCustomers[i].customer_state = this.customerStateToString(foundCustomers[i].current);
          }
          this.foundCustomers = foundCustomers;
          console.log(foundCustomers);
          this.source.load(this.foundCustomers);
        }
      )
  }
  customerStateToString(state){
    if(state){
      return "In a room";
    }else{
      return "Not in a room";
    }
  }
  customerForBooking(){
    this.getcustomers();
    return this.foundCustomers;
  }
  ngOnInit() {
    this.getcustomers();
  }
  onUserRowSelect(event): void {
    console.log(event.data.customer_id);
    this.shareService.currentCustomer = event.data;
    this.showDetails(event.data.customer_id);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve(this.deleteCustomer(event.data.customer_id));
    } else {
      event.confirm.reject();
    }
  }
}
