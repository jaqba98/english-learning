import { Routes } from '@angular/router';

import { LoginComponent } from '@english-learning/fe-page';

export const authRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // i am here
  // { path: 'registration', component: RegistrationComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'change-password', component: ChangePasswordComponent },
];
