import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register-component/register-component';
import { LoginComponent } from './login/login-component/login-component';

export const AUTH_ROUTES: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
