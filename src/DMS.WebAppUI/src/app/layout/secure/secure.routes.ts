import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DocumentComponent } from '../../document/document.component';
import { AccessHistoryComponent } from '../../accesshistory/accesshistory.component';
import { AuthGuard } from '../../shared/auth.guard';

export const SECURE_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'document', component: DocumentComponent, canActivate: [AuthGuard] },
    { path: 'accesshistory', component: AccessHistoryComponent, canActivate: [AuthGuard] },
];