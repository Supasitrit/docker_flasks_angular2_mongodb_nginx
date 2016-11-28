// import {Customer} from './Customer'

export class Booking {
    booking_id: string;
    check_in :string;
    check_out:string;
    room_state : number;
    current_customer:{
      customer_id: string;
      name: string;
      phone_number: string;
      email: string;
    };
    paid:boolean;
}

export class CreateBookingRequest {
    booking_id: string = "";
    check_in: string = "";
    check_out: string = "";
    deposit: string = "";
    ppm: string = "";
    customer_ids: string = "";
    room_name: string = "";
    room_type: any = "";
    confirmed: any;
}

export class BookingActivity {
    start: string="";
    title: string="";
    color: string="";
}
