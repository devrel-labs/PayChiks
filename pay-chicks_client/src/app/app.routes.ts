import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: "auth/signin", component: SigninComponent},
  {path: "auth/signup", component: SignupComponent},
  {
    path: 'user/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
