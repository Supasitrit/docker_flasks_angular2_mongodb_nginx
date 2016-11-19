import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './maintenances.routing';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Maintenacne services components*/
import { maintenances } from './maintenances.component';
import { maintenancesTable } from './components/maintenancesTable';
import { maintenancesService } from './components/maintenances.service';
import { addMaintenance } from './components/addMaintenance';
import { editMaintenance } from './components/editMaintenance';

/* Custom Services*/
import { HttpClient } from '../../services/httpService';
import { shareService } from '../../services/shareService';
import { tokenService } from '../../services/tokenService';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { roomsService } from '../rooms/components/rooms.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    Ng2SmartTableModule,
    routing,
    FormsModule
  ],
  declarations: [
    maintenances,
    maintenancesTable,
    addMaintenance,
    editMaintenance
  ],
  providers: [
    maintenancesService,
    tokenService,
    CookieService,
    HttpClient,
    shareService,
    roomsService
  ]
})
export default class maintenancesModule {}
