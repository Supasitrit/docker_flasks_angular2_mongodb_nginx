import {User} from './Login'

export class Customer {
    customer_id: string;
    name : string;
    phone_number : string;
    email: string;
    current: any;
    customer_state: any;    
}

export class CreateCustomerRequest {
    name: string;
    phone_number: string;
    email:string;
    facebook:string;
    phone: any;
}

export class EditCustomerRequest {
    name: string;
    phone_number: string;
    phone: any;
    email:string;
    facebook:string;
    id: string;
}
export class CustomerDetail  {
    name: string;
    phone_number: string;
    customer_id: string;
    email:string;
    created_at: string;
    facebook:string;
    modified_at:string;
    created_by:User;
}
