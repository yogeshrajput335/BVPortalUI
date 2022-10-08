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
      // { path: "settings", component: SettingsComponent },
      // { path: "tables", component: TablesComponent },
      // { path: "add-timesheet", component: AddTimesheetComponent },
      // { path: "view-timesheet", component: ViewTimesheetComponent },
      { path: "users", component: UsersComponent },
      { path: "timesheet", component: TimesheetComponent },
      // { path: "candidates", component: CandidatesComponent },
      // { path: "open-jobs", component: OpenJobsComponent },
      // { path: "refer", component: ReferComponent },
      // { path: "holidays", component: HolidaysComponent },
      // { path: "clients", component: ClientsComponent },
      // { path: "projects", component: ProjectsComponent },
      // { path: "leave-type", component: LeaveTypeComponent },
      // { path: "leave", component: LeaveComponent },
      // { path: "asset", component: AssetComponent },
      // { path: "asset-type", component: AssetTypeComponent },

       //{ path: "maps", component: MapsComponent },
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
