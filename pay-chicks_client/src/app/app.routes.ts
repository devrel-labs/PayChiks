import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: "auth/signin", component: SigninComponent},
  {path: "auth/signup", component: SignupComponent},
  {path: "**", component: HomeComponent}
];
