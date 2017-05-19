import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { SecureComponent } from './layout/secure/secure.component';
import { SECURE_ROUTES } from './layout/secure/secure.routes';
import { PublicComponent } from './layout/public/public.component';
import { PUBLIC_ROUTES } from './layout/public/public.routes';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
    { path: '', component: SecureComponent, canActivate: [AuthGuard], data: { title: 'Secure Views' }, children: SECURE_ROUTES },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
