import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { logout } from './logout.component';
import { routing }       from './logout.routing';
import { logoutService } from './logout.service';
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
    logout
  ],
  providers: [
    logoutService,
    tokenService,
    HttpClient,
    CookieService,
  ]
})
export default class logoutModule {}
