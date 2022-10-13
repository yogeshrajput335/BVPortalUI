import { ProjectComponent } from './../features/project/project.component';
import { LeaveTypeDataService } from './../features/leave-type/services/leave-type-data.service';
import { UserDataService } from '../features/users/services/user-data.service';
import { UsersComponent } from './../features/users/users.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavComponent } from "./nav/nav.component";
import { DashboardComponent } from '../features/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CoreModule } from './core.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { TimesheetComponent } from '../features/timesheet/timesheet.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteUserDialogComponent } from '../features/users/dialogs/delete/delete-user.dialog.component';
import { AddUserDialogComponent } from '../features/users/dialogs/add/add-user.dialog.component';
import { EditUserDialogComponent } from '../features/users/dialogs/edit/edit-user.dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LeaveTypeComponent } from '../features/leave-type/leave-type.component';
import { AddLeaveTypeDialogComponent } from '../features/leave-type/dialogs/add/add-leave-type.dialog.component';
import { DeleteLeaveTypeDialogComponent } from '../features/leave-type/dialogs/delete/delete-leave-type.dialog.component';
import { EditLeaveTypeDialogComponent } from '../features/leave-type/dialogs/edit/edit-leave-type.dialog.component';
import { ClientComponent } from '../features/client/client.component';
import { AddClientDialogComponent } from '../features/client/dialogs/add/add-client.dialog.component';
import { DeleteClientDialogComponent } from '../features/client/dialogs/delete/delete-client.dialog.component';
import { EditClientDialogComponent } from '../features/client/dialogs/edit/edit-client.dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ClientDataService } from '../features/client/services/client-data.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProfileComponent } from '../features/profile/profile.component';
import { GlobalSettingsComponent } from '../features/global-settings/global-settings.component';
import { OrganizationalStructureComponent } from '../features/organizational-structure/organizational-structure.component';
import { LeaveComponent } from '../features/leave/leave.component';
import { HolidayComponent } from '../features/holiday/holiday.component';
import { ReferenceComponent } from '../features/reference/reference.component';
import { JobsComponent } from '../features/jobs/jobs.component';
import { AssetComponent } from '../features/asset/asset.component';
import { AssetTypeComponent } from '../features/asset-type/asset-type.component';
import { AssetAllocationComponent } from '../features/asset-allocation/asset-allocation.component';
import { CandidateComponent } from '../features/candidate/candidate.component';
import { ProjectAssignmentComponent } from '../features/project-assignment/project-assignment.component';
import { TimesheetDetailComponent } from '../features/timesheet-detail/timesheet-detail.component';
import { TimesheetApprovalComponent } from '../features/timesheet-approval/timesheet-approval.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AddAssetDialogComponent } from '../features/asset/dialogs/add/add-asset.dialog.component';
import { DeleteAssetDialogComponent } from '../features/asset/dialogs/delete/delete-asset.dialog.component';
import { EditAssetDialogComponent } from '../features/asset/dialogs/edit/edit-asset.dialog.component';
import { AssetDataService } from '../features/asset/services/asset-data.service';
import { AddAssetTypeDialogComponent } from '../features/asset-type/dialogs/add/add-asset-type.dialog.component';
import { DeleteAssetTypeDialogComponent } from '../features/asset-type/dialogs/delete/delete-asset-type.dialog.component';
import { EditAssetTypeDialogComponent } from '../features/asset-type/dialogs/edit/edit-asset-type.dialog.component';
import { AssetTypeDataService } from '../features/asset-type/services/asset-type-data.service';
import { EmployeeComponent } from '../features/employee/employee.component';
import { AddEmployeeDialogComponent } from '../features/employee/dialogs/add/add-employee.dialog.component';
import { DeleteEmployeeDialogComponent } from '../features/employee/dialogs/delete/delete-employee.dialog.component';
import { EditEmployeeDialogComponent } from '../features/employee/dialogs/edit/edit-employee.dialog.component';
import { EmployeeDataService } from '../features/employee/services/employee-data.service';

@NgModule({
  declarations: [DashboardComponent, UsersComponent, LeaveTypeComponent ,AdminComponent,ProjectComponent,NavComponent
  ,TimesheetComponent,ClientComponent,
  AddUserDialogComponent,
  AddLeaveTypeDialogComponent,
  AddClientDialogComponent,
  DeleteUserDialogComponent,
  DeleteLeaveTypeDialogComponent,
  DeleteClientDialogComponent,
  EditUserDialogComponent,
  EditLeaveTypeDialogComponent,
  EditClientDialogComponent,
  ProfileComponent,
  GlobalSettingsComponent,
  OrganizationalStructureComponent,
  LeaveComponent,
  HolidayComponent,
  ReferenceComponent,
  JobsComponent,
  AssetComponent,
  AssetTypeComponent,
  AssetAllocationComponent,
  CandidateComponent,
  ProjectAssignmentComponent,
  TimesheetDetailComponent,
  TimesheetApprovalComponent,
  AddAssetDialogComponent,
  DeleteAssetDialogComponent,
  EditAssetDialogComponent,
  AddAssetTypeDialogComponent,
  DeleteAssetTypeDialogComponent,
  EditAssetTypeDialogComponent,
  EmployeeComponent,
  AddEmployeeDialogComponent,
  DeleteEmployeeDialogComponent,
  EditEmployeeDialogComponent
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CoreModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule
  ],
  providers: [UserDataService,LeaveTypeDataService,ClientDataService,AssetDataService,AssetTypeDataService,
    EmployeeDataService]
})
export class AdminModule { }
