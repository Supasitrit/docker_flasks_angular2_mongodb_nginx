import { Injectable }    from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class tokenService {
    constructor(private _cookieService:CookieService){}
    getToken() {
      let token = this._cookieService.get('token');
      if (token == "" || token == null){
        console.log("No token");
      }else{
        return token;
      }

    }
    setToken(access_token:string) {
      this._cookieService.put('token', access_token);
    }
    deleteToken(){
      console.log("deleting token");
      this._cookieService.remove('token');
    }
}
