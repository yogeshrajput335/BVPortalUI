import { DataService } from './../features/users/services/data.service';
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
import { DeleteDialogComponent } from '../features/users/dialogs/delete/delete.dialog.component';
import { AddDialogComponent } from '../features/users/dialogs/add/add.dialog.component';
import { EditDialogComponent } from '../features/users/dialogs/edit/edit.dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [DashboardComponent, UsersComponent ,AdminComponent,NavComponent
  ,TimesheetComponent,
  AddDialogComponent,
  DeleteDialogComponent,
  EditDialogComponent],
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
    MatInputModule
  ],
  providers: [DataService]
})
export class AdminModule { }
