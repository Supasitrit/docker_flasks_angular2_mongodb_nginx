import {Optional,Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {tokenService} from './tokenService';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
// const urlPrefix = env === 'production' ? 'http://128.199.104.193/ams/' : 'http://localhost/ams/';
const urlPrefix = 'http://128.199.104.193/ams/';


@Injectable()
export class HttpClient {
    http:Http;
    tokenService:tokenService;
    urlPrefix:string;
    token:string;

    constructor(http: Http,tokenService:tokenService) {
        this.http = http;
        this.tokenService = tokenService;
        this.urlPrefix = urlPrefix;
    }

    createAuthorizationHeader(headers:Headers) {
        this.token = this.tokenService.getToken()
        headers.append('Authorization', 'bearer ' + this.token);
        console.log(this.token);
    }

    get(url) {
        console.log("Status:  GET "+this.urlPrefix + url);
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(this.urlPrefix + url,{headers:headers});
    }


    post(url, data,@Optional() for_token:boolean = false) {
        console.log("Status:  POST "+this.urlPrefix + url);
        let headers = new Headers();
        if (!for_token) {
            this.createAuthorizationHeader(headers);
        }
        return this.http.post(this.urlPrefix + url, data,{headers:headers});
    }

    put(url,data) {
        console.log("Status:  PUT "+this.urlPrefix + url);
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put(this.urlPrefix + url,data,{headers:headers});
    }
    delete(url) {
        console.log("Status:  DELETE "+this.urlPrefix + url);
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(this.urlPrefix + url,{headers:headers});
    }
}
