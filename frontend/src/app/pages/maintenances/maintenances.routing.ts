import { Routes, RouterModule } from '@angular/router';
import { maintenances } from './maintenances.component';
import { addMaintenance } from './components/addMaintenance';
import { editMaintenance } from './components/editMaintenance';

const routes: Routes = [
  {
    path: '',
    component: maintenances
  },
  {
    path: 'add',
    component: addMaintenance
  },
  {
    path: 'edit',
    component: editMaintenance
  }
];

export const routing = RouterModule.forChild(routes);
