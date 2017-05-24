import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DocumentComponent } from '../../document/document.component';
import { AuthGuard } from '../../shared/auth.guard';

export const SECURE_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'document', component: DocumentComponent, canActivate: [AuthGuard] },
];