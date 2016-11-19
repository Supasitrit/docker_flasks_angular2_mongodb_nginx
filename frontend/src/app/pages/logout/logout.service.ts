import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router } from '@angular/router';

/* Services */
import { tokenService } from '../../services/tokenService';
import { HttpClient } from '../../services/httpService';

@Injectable()
export class logoutService {
  constructor (private httpClient: HttpClient, private tokenService: tokenService, private router: Router) {}
  logout() {
    console.log("logging out");
    this.tokenService.deleteToken();
    this.router.navigate(['pages/dashboard']);
  }
}
