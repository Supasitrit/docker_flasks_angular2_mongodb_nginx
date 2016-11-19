import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';


/*Vendoe service*/
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
/*Custom service*/
import { bookings } from './bookings.component';
import { routing } from './bookings.routing';
import { bookingsTable } from './components/bookingsTable';
import { bookingsService } from './components/bookings.service';
import { HttpClient } from '../../services/httpService';
import { shareService } from '../../services/shareService';
import { tokenService } from '../../services/tokenService';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { addBooking } from './components/addBooking';
import { editBooking } from './components/editBooking';
import { customersService } from '../customers/components/customers.service';
import { roomsService } from '../rooms/components/rooms.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    bookings,
    bookingsTable,
    addBooking,
    editBooking
  ],
  providers: [
    bookingsService,
    tokenService,
    CookieService,
    HttpClient,
    shareService,
    customersService,
    roomsService
  ]
})
export default class bookingsModule {}
