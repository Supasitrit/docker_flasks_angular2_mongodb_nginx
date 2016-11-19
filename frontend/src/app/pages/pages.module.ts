import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';

import { HttpClient } from '../services/httpService';
import { tokenService } from '../services/tokenService';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages],
  providers: [tokenService, CookieService]
})
export class PagesModule {
}
