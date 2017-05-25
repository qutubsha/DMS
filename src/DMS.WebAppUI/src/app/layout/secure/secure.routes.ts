import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AuthGuard } from '../../shared/auth.guard';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

export const SECURE_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard] }
];