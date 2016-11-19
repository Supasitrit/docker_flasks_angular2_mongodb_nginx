import { Routes, RouterModule } from '@angular/router';
import { rooms } from './rooms.component';
import { bookingHistory } from './components/bookingHistory';

const routes: Routes = [
  {
    path: '',
    component: rooms
  },
  {
    path: ':room_name',
    component: bookingHistory
  }
];

export const routing = RouterModule.forChild(routes);
