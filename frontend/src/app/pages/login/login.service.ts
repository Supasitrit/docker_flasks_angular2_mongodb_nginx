import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

/* Services */
import { tokenService } from '../../services/tokenService';
import { HttpClient } from '../../services/httpService';
/* Models */
import { LoginResponse } from '../../models/Login';

@Injectable()
export class loginService {
  http:HttpClient;
  private email:string;
  private password:string;
  constructor (private httpClient: HttpClient, private tokenService: tokenService) {
    this.http = httpClient;
    this.email = "";
    this.password = "";
  }
  login(email:string,password:string): Observable<LoginResponse> {
    let params = {
        "email" : email,
        "password":password
    }
    return this.http.post("login", params,true)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
