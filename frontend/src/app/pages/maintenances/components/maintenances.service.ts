import { Injectable } from '@angular/core';
import {
  // Http,
  Response,
  // RequestOptions,
  // Headers,
  // Request,
  // RequestMethod
} from '@angular/http';
import {Observable} from 'rxjs/Rx';
// import { Http, Headers } from '@angular/http';
/* Services */
import { HttpClient } from '../../../services/httpService';

/* Models */
import { maintenance } from '../../../models/Maintenance';


@Injectable()
export class maintenancesService {
  http:HttpClient;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }
  delete(maintenance_id){
    return this.http.delete("maintenances/"+maintenance_id)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  // makeFileRequest(params: Array<string>, files: Array<File>) {
  //    return new Promise((resolve, reject) => {
  //        var formData: any = new FormData();
  //        var xhr = new XMLHttpRequest();
  //        for(var i = 0; i < files.length; i++) {
  //            formData.append("uploads[]", files[i], files[i].name);
  //        }
  //        xhr.onreadystatechange = function () {
  //            if (xhr.readyState == 4) {
  //                if (xhr.status == 200) {
  //                    resolve(JSON.parse(xhr.response));
  //                } else {
  //                    reject(xhr.response);
  //                }
  //            }
  //        }
  //        xhr.open("POST", this.urlPrefix, true);
  //        xhr.send(formData);
  //    });
  // }
  // upload(filesToUpload){
  //   this.makeFileRequest([], filesToUpload).then((result) => {
  //       console.log(result);
  //   }, (error) => {
  //       console.error(error);
  //   });
  // }
  create(CreateMaintenanceRequest){
    // let params = {
    //   "room_name" : CreateMaintenanceRequest.room_name,
    //   "photo": CreateMaintenanceRequest.photo,
    //   "cost": CreateMaintenanceRequest.cost,
    //   "title": CreateMaintenanceRequest.title
    // }
    console.log(CreateMaintenanceRequest);
    var formData = new FormData;
    formData.append("room_name", CreateMaintenanceRequest.room_name);
    formData.append("photo", CreateMaintenanceRequest.photo);
    formData.append("cost", CreateMaintenanceRequest.cost);
    formData.append("title", CreateMaintenanceRequest.title);
    
    return this.http.post("maintenances", formData)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  update(editMaintenanceRequest){
    console.log(editMaintenanceRequest);
    var formData = new FormData;
    formData.append("room_name", editMaintenanceRequest.room_name);
    formData.append("photo", editMaintenanceRequest.photo);
    formData.append("cost", editMaintenanceRequest.cost);
    formData.append("title", editMaintenanceRequest.title);
    
    return this.http.put("maintenances/"+editMaintenanceRequest.maintenance_id, formData)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getmaintenances():Observable<Array<maintenance>>{
      return this.http.get("maintenances")
                       .map((res:Response) => res.json().maintenances)
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
