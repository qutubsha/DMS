import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DocumentComponent } from '../../document/document.component';
import { AccessHistoryComponent } from '../../accesshistory/accesshistory.component';
import { AuthGuard } from '../../shared/auth.guard';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

export const SECURE_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
    { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard] }
=======
    { path: 'document', component: DocumentComponent, canActivate: [AuthGuard] },
    { path: 'accesshistory', component: AccessHistoryComponent, canActivate: [AuthGuard] },
>>>>>>> 15f35f1f64ba5ff5b4e543ff6cc5f01ee6e0cf7a
];