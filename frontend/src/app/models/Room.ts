import {Booking} from './Booking'
export class Room {
    room_number: string;
    name: string;
    building :string;
    room_state : number;
}

export class RoomDetail {
	'booking_history': Array<Booking>;
  'building' : string;
  'current_booking': Booking;
  'description': string;
  'maintenance_history':Array<any>;
  'modified_at': string;
  "name": string;
  'room_number': string;
  'room_state' : number;
}
