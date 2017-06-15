import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DocumentComponent } from '../../document/document.component';
import { AccessHistoryComponent } from '../../accesshistory/accesshistory.component';
import { AuthGuard } from '../../shared/auth.guard';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { RolesComponent } from '../../roles/roles.component';
import { RightsComponent } from '../../roles/rights.component';
import { ChangePasswordComponent } from '../../user-profile/change-password.component';
import { EmailTemplateComponent } from '../../email-template/email-template.component';
import { EditEmailTemplateComponent } from '../../email-template/edit-email-template.component';
import { VersionHistoryComponent } from '../../versionhistory/versionhistory.component';
import { UserComponent } from '../../user-profile/manage-user.component';
import { ConfigurationSettingsComponent } from '../../configuration-settings/configuration-settings.component';
import { DocAdvanceSearchComponent } from '../../doc-advance-search/doc-advance-search.component';
import { SharedDocumentComponent } from '../../shared-document/shared-document.component';
import { TagComponent } from '../../document/tag.component';

export const SECURE_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'document', component: DocumentComponent, canActivate: [AuthGuard] },
    { path: 'document/:type', component: DocumentComponent, canActivate: [AuthGuard] },
    { path: 'docaccesshistory/:id', component: AccessHistoryComponent, canActivate: [AuthGuard] },
    { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
    { path: 'rights', component: RightsComponent, canActivate: [AuthGuard] },
    { path: 'ChangePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
    { path: 'docversionhistory/:id', component: VersionHistoryComponent, canActivate: [AuthGuard] },
    { path: 'email-template', component: EmailTemplateComponent, canActivate: [AuthGuard] },
    { path: 'edit-email-template', component: EditEmailTemplateComponent, canActivate: [AuthGuard] },
    { path: 'userdetails', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'configurationsettings', component: ConfigurationSettingsComponent, canActivate: [AuthGuard] },
    { path: 'doc-advance-search', component: DocAdvanceSearchComponent, canActivate: [AuthGuard] },
    { path: 'shared-documents/:type', component: SharedDocumentComponent, canActivate: [AuthGuard] },
    { path: 'tagcloud', component: TagComponent, canActivate: [AuthGuard] }
];