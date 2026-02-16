import { Routes } from '@angular/router';
import { PatientFormComponent } from './features/patient-form/patient-form';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', component: PatientFormComponent },
  { path: 'edit/:id', component: PatientFormComponent },
  { path: 'admin', component: AdminDashboardComponent }
];
