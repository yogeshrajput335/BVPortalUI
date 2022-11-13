import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {EmployeeDataService} from '../../services/employee-data.service';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-set-clientperhour.dialog',
  templateUrl: '../../dialogs/set-clientperhour/set-clientperhour.dialog.html',
  styleUrls: ['../../dialogs/set-clientperhour/set-clientperhour.dialog.css']
})
export class SetClientPerHourDialogComponent {
  perHour:any
  clientPerHourHistory:any
  constructor(public dialogRef: MatDialogRef<SetClientPerHourDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: EmployeeDataService,
              private httpClient: HttpCommonService) {
                this.perHour = data.perHour;
                this.httpClient.get('Employee/GetEmpClientPerHourHistory/'+this.data.id).subscribe((data:any) => {
                  //this.dataChange.next(data);
                  this.clientPerHourHistory = data;
                },
                (error: HttpErrorResponse) => {
                console.log (error.name + ' ' + error.message);
                });
              }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dataService.setClientPerHour(this.data.id,this.perHour);
  }
}
