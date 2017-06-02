import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DocumentComponent } from '../../document/document.component';
import { AccessHistoryComponent } from '../../accesshistory/accesshistory.component';
import { AuthGuard } from '../../shared/auth.guard';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { RolesComponent } from '../../roles/roles.component';
import { RightsComponent } from '../../roles/rights.component';
import { ChangePasswordComponent } from '../../user-profile/change-password.component';
import { VersionHistoryComponent } from '../../versionhistory/versionhistory.component';
export const SECURE_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'document', component: DocumentComponent, canActivate: [AuthGuard] },
    { path: 'docaccesshistory/:id', component: AccessHistoryComponent, canActivate: [AuthGuard] },
    { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
    { path: 'rights', component: RightsComponent, canActivate: [AuthGuard] },
    { path: 'ChangePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
    { path: 'docversionhistory/:id', component: VersionHistoryComponent, canActivate: [AuthGuard] },

];