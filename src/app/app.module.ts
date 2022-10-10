import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './features/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './shared/core.module';
import { NavComponent } from './shared/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationInterceptor } from './core/services/authentication.interceptor';
import { RouterModule } from '@angular/router';
import { IndexNavbarComponent } from './shared/index-navbar/index-navbar.component';
import { IndexComponent } from './features/index/index.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from './samples/table/table.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { LeaveComponent } from './features/leave/leave.component';
import { HolidayComponent } from './features/holiday/holiday.component';
import { ReferenceComponent } from './features/reference/reference.component';
import { JobsComponent } from './features/jobs/jobs.component';
import { AssetComponent } from './features/asset/asset.component';
import { AssetTypeComponent } from './features/asset-type/asset-type.component';
import { AssetAllocationComponent } from './features/asset-allocation/asset-allocation.component';
import { CandidateComponent } from './features/candidate/candidate.component';
import { ProjectAssignmentComponent } from './features/project-assignment/project-assignment.component';
import { TimesheetDetailComponent } from './features/timesheet-detail/timesheet-detail.component';
import { TimesheetApprovalComponent } from './features/timesheet-approval/timesheet-approval.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    IndexNavbarComponent,
    TableComponent,

   ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatNativeDateModule ,
  ],
  providers: [AuthenticationInterceptor],

  bootstrap: [AppComponent]
})
export class AppModule { }
