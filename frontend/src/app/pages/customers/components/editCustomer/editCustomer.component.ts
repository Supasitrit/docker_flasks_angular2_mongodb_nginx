import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { customersService } from '../customers.service';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

/* Model */
import { CreateCustomerRequest } from '../../../../models/Customer';
import { EditCustomerRequest } from '../../../../models/Customer';

/* Services */
import { shareService } from '../../../../services/shareService';
@Component({
  template: require('./editCustomer.html')
})
export class editCustomer implements OnInit {
  editCustomer: EditCustomerRequest;
  customer_id: string;
  customer: any;
  constructor(fb:FormBuilder, private _customersService: customersService, private router: Router, private shareService: shareService) {
    this.editCustomer = new EditCustomerRequest();
    this.editCustomer.id = this.customer_id;
    this.customer_id = this.shareService.currentCustomerId;
    this.editCustomer = this.shareService.currentCustomer;
    this.customer =  this.shareService.currentCustomer;
  }
  error = false;
  goToCustomers() {
    this.router.navigate(['pages/customers']);
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.editCustomer); }
  onSubmit() {
    this._customersService.edit(this.editCustomer).subscribe(
            createCustomerResponse => {
              console.log(createCustomerResponse);
              this.router.navigate(['pages/customers']);
            },
            error =>  {
                console.log(error);
                this.error = true;
            }
        )
  }
  ngOnInit() {
    if (!this.customer_id || !this.customer){
      this.router.navigate(['pages/customers']);
    }
  }
}
