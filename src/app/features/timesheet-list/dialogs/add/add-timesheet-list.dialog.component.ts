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
    this.dataService.addTimesheetList(this.data);
  }
}
