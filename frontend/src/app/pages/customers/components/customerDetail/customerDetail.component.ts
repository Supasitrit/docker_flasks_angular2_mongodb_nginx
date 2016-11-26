import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { customersService } from '../customers.service';
import { shareService } from '../../../../services/shareService';

@Component({
  selector: 'customer-detail',
  template: require('./customerDetail.html')
})
export class customerDetail implements OnInit {
  // _askConfirmDelete:boolean;
  error:boolean = false;
  errorMessage:string = "";

  constructor(private _customersService: customersService, private router: Router, private shareService: shareService) {
    this.shareService._askConfirmDelete = false;
  }
  goToEditCustomer(){
    this.router.navigate(['pages/customers/edit']);
  }
  askConfirmDelete(){
    this.shareService._askConfirmDelete = true;
  }
  deleteCustomer(customer_id){
    this._customersService.delete(customer_id).subscribe(
            deleteCustomerResponse => {
              if(deleteCustomerResponse.success){
                console.log(deleteCustomerResponse);
                this.router.navigate(['pages/customers']);
              }else{
                this.error = true;
                this.errorMessage = deleteCustomerResponse.message;
              }
            },
            error =>  {
                console.log(error);
            }
        )
  }
  customerStateToString(state){
    if(state == 1){
      return "In a room";
    }else{
      return "Not in a room";
    }
  }
  ngOnInit() {
  }
}
