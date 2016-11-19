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
import { Customer } from '../../../models/Customer';
import { CustomerDetail } from '../../../models/Customer';
import { CreateCustomerRequest } from '../../../../models/Customer';


@Injectable()
export class customersService {
  http:HttpClient;
  customerDetail:CustomerDetail;
  customers:Customer[];
  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }
  delete(customer_id){
    return this.http.delete("customers/"+customer_id)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  edit(EditCustomerRequest){
    let params = {
      "email" : EditCustomerRequest.email,
      "name": EditCustomerRequest.name,
      "phone": EditCustomerRequest.phone,
      "facebook": EditCustomerRequest.facebook
    }
    console.log(EditCustomerRequest);
    return this.http.put("customers/"+EditCustomerRequest.customer_id, params)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  create(CreateCustomerRequest){
    let params = {
      "email" : CreateCustomerRequest.email,
      "name": CreateCustomerRequest.name,
      "phone": CreateCustomerRequest.phone,
      "facebook": CreateCustomerRequest.facebook
    }
    console.log(CreateCustomerRequest);
    return this.http.post("customers", params)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  getCustomerDetail(id):Observable<CustomerDetail>{
      // Query room by name
      return this.http.get("customers/"+id)
           .map((res:Response) => res.json().customer)
           .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
    }
  findCustomerById(customer_id){
    console.log("Status:  findCustomerById, Id:  "+ customer_id);
    this.getCustomerDetail(customer_id).subscribe(
      (values: CustomerDetail) => {
        this.customerDetail = values;
        console.log(values);
      }
    )
  }
  getcustomers():Observable<Array<Customer>>{
      return this.http.get("customers")
                       .map((res:Response) => res.json().customers)
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
