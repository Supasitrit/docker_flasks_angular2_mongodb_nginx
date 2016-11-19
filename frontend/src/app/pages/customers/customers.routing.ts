import { Routes, RouterModule } from '@angular/router';
import { customers } from './customers.component';
import { addCustomer } from './components/addCustomer';
import { editCustomer } from './components/editCustomer';
const routes: Routes = [
  {
    path: '',
    component: customers
  },
  {
    path: 'add',
    component: addCustomer
  },
  {
    path: 'edit',
    component: editCustomer
  }
];

export const routing = RouterModule.forChild(routes);
