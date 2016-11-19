import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { customersService } from '../customers.service';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

/* Model */
import { CreateCustomerRequest } from '../../../../models/Customer';

@Component({
  // selector: 'addCustomer',
  template: require('./addCustomer.html')
})
export class addCustomer implements OnInit {
  newCustomer: CreateCustomerRequest;
  constructor(fb:FormBuilder, private _customersService: customersService, private router: Router) {
    this.newCustomer = new CreateCustomerRequest();
  }
  error = false;
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.newCustomer); }
  goToCustomers() {
    this.router.navigate(['pages/customers']);
  }
  onSubmit() {
    this._customersService.create(this.newCustomer).subscribe(
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
  ngOnInit() { }
}
