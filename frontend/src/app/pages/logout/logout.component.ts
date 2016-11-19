import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import {logoutService} from './logout.service';
import {tokenService} from '../../services/tokenService';

@Component({
  selector: 'logout',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./logout.scss')],
  template: require('./logout.html'),
})
export class logout {


  constructor(private logoutService: logoutService) {
  }

  public logout():void {
    this.logoutService.logout();
  }
}
