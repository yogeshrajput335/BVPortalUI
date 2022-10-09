import { LeaveTypeComponent } from './../features/leave-type/leave-type.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../features/dashboard/dashboard.component";
import { TimesheetComponent } from "../features/timesheet/timesheet.component";
import { UsersComponent } from "../features/users/users.component";
import { AdminComponent } from "./admin/admin.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "timesheet", component: TimesheetComponent },
      { path: "leave-type", component: LeaveTypeComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
