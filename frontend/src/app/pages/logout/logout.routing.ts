import { Routes, RouterModule }  from '@angular/router';

import { logout } from './logout.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: logout
  }
];

export const routing = RouterModule.forChild(routes);
