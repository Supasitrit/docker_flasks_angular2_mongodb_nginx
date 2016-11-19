import {Optional,Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {tokenService} from './tokenService';
// import {customersService} from '../pages/customers/customers.service';

@Injectable()
export class shareService {
  currentCustomerId: string;
  currentCustomer:any;
  currentMaintenance:any;
  currentBooking:any;
  _askConfirmDelete:boolean;
  hideCustomerList:boolean;
  showCustomerDetail:boolean;

  constructor(){}
}
