import { Component } from '@angular/core';
import { customersService } from './components/customers.service';
import { shareService } from '../../services/shareService';


@Component({
  selector: 'customers',
  styles: [],
  template: require('./customers.html')
})
export class customers {
  constructor(private _customersService: customersService, private shareService: shareService) {}

}
