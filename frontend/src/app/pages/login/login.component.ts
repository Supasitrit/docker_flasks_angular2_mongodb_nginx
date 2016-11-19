import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import {loginService} from './login.service';
import {tokenService} from '../../services/tokenService';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  private semail:string;
  private spassword:string;
  private error:boolean;
  private errorMessage:string;

  constructor(fb:FormBuilder, private loginService: loginService, private tokenService: tokenService, private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.errorMessage = "Invalid username or password";
    this.error = false;
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
      // console.log("Status:  Loging in with "+ this.semail + "," + this.spassword);
      this.loginService.login(this.semail, this.spassword).subscribe(
              loginResponse => {
                  this.tokenService.setToken(loginResponse.access_token);
                  console.log("Token = " + this.tokenService.getToken());
                  this.router.navigate(['pages/dashboard']);
              },
              error =>  {
                  this.error = true;
                  console.log(error);
              }
          )
    }
  }
}
