import { Routes, RouterModule } from '@angular/router';
import { bookings } from './bookings.component';
import { addBooking } from './components/addBooking';
import { editBooking } from './components/editBooking';

const routes: Routes = [
  {
    path: '',
    component: bookings
  },
  {
    path: 'add',
    component: addBooking
  },
  {
    path: 'edit',
    component: editBooking
  },
];

export const routing = RouterModule.forChild(routes);
