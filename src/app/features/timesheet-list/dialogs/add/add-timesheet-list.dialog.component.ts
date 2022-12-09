import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TimesheetListDataService } from '../../services/timesheet-list-data.service';
import { TimesheetList } from '../../models/TimesheetList';

@Component({
  selector: 'app-add-timesheet-list.dialog',
  templateUrl: '../../dialogs/add/add-timesheet-list.dialog.html',
  styleUrls: ['../../dialogs/add/add-timesheet-list.dialog.css']
})

export class AddTimesheetListDialogComponent {
  statuses: any
  projects: any
  employees: any
  WeekDates:any[] =[]
  ins_datas=['0','0','0','0','0','0','0']
  constructor(public dialogRef: MatDialogRef<AddTimesheetListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimesheetList,
    public dataService: TimesheetListDataService) {
    this.statuses = this.dataService.getStatues()
    this.projects = this.dataService.getProjects()
    this.employees = this.dataService.getEmployees()
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.data.status='NEW';
    this.data.detail=[];
    this.dataService.addTimesheetList(this.data,this.WeekDates,this.ins_datas);
  }

  public onDateChange() {
    this.WeekDates = [];
    var curr = this.data.weekEndingDate;
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    var selMon = this.data.weekEndingDate.getMonth()
    var d = firstday;
    for (let i = 0; i < 7; i++) {
      if(d.getMonth() == selMon){
        this.WeekDates.push(new Date(d))
      }
      d.setDate(d.getDate() + 1)
      if(d > lastday){
        break;
      }
    }
  }
   days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday"
];
}
