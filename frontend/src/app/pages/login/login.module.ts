import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Login } from './login.component';
import { routing }       from './login.routing';
import { loginService } from './login.service';
import { tokenService } from '../../services/tokenService';
import { HttpClient } from '../../services/httpService';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Login
  ],
  providers: [
    loginService,
    tokenService,
    HttpClient,
    CookieService,
  ]
})
export default class LoginModule {}
