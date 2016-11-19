import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }  from '@angular/common';
import { customers } from './customers.component';
import { routing } from './customers.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';



/* Custom Service */
import { HttpClient } from '../../services/httpService';
import { shareService } from '../../services/shareService';
import { tokenService } from '../../services/tokenService';
import { CookieService } from 'angular2-cookie/services/cookies.service';
/* Customer Components */
import { customersTable } from './components/customersTable';
import { customerDetail } from './components/customerDetail';
import { addCustomer } from './components/addCustomer';
import { editCustomer } from './components/editCustomer';
/* Customer Service */
import { customersService } from './components/customers.service';

@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    NgaModule,
    FormsModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    customers,
    customersTable,
    customerDetail,
    addCustomer,
    editCustomer
  ],
  providers: [
    customersService,
    tokenService,
    CookieService,
    HttpClient,
    shareService
  ]
})
export default class customersModule {}
