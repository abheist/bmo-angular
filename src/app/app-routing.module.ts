import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { AuthGuardService } from './auth-guard.service';
import { LoginGuardService } from './login-guard.service';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'verify-email/:id', component: ConfirmEmailComponent, canActivate: [LoginGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
