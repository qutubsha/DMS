import { LoginComponent } from '../../login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from '../../login/registration.component';

export const PUBLIC_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'Registration', component: RegistrationComponent }
];