import { GuardsCheckEnd, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { adminGuard } from './Guards/Admin/admin.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LogInComponent},
    {path:'admin',component:AdminComponent,canActivate:[adminGuard]},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'signup',component:SignUpComponent},
    {path:'contact',component:ContactComponent},
    {path:'not-found',component:NotFoundComponent},
    {path:'**',redirectTo:'not-found'}
];
