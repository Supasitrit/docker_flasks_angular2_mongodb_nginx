import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { rooms } from './rooms.component';
import { routing } from './rooms.routing';

import { NgaModule } from '../../theme/nga.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';


/* Room Components */
import { roomDetail } from './components/roomDetail';
import { roomsTable } from './components/roomsTable';
import { bookingHistory } from './components/bookingHistory';

/*Room Service */
import { roomsService } from './components/rooms.service';


/* CUstom Services */
import { HttpClient } from '../../services/httpService';
import { tokenService } from '../../services/tokenService';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { shareService } from '../../services/shareService';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    rooms,
    roomsTable,
    bookingHistory,
    roomDetail
  ],
  providers: [
    roomsService,
    tokenService,
    CookieService,
    HttpClient,
    shareService
  ]
})
export default class RoomsModule {}
