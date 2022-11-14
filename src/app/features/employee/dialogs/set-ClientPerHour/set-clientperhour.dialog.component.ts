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
  clientPerHourData:any
  clientPerHourHistory:any
  clientPerHourHistoryInitial:any
  clients:any
  projects:any
  client:any
  clientProjects:any
  setProject:any
  clientForHistory:any
  constructor(public dialogRef: MatDialogRef<SetClientPerHourDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: EmployeeDataService,
              private httpClient: HttpCommonService) {
                this.clients = this.dataService.getClients();
                this.projects = this.dataService.getProjects();
                this.perHour = data.perHour;
                this.httpClient.get('Employee/GetEmpClientPerHour').subscribe((data:any) => {
                  //this.dataChange.next(data);
                  this.clientPerHourData = data;
                },
                (error: HttpErrorResponse) => {
                console.log (error.name + ' ' + error.message);
                });
                this.httpClient.get('Employee/GetEmpClientPerHourHistory/'+this.data.id).subscribe((data:any) => {
                  //this.dataChange.next(data);
                  this.clientPerHourHistory = data;
                  this.clientPerHourHistoryInitial = data;
                },
                (error: HttpErrorResponse) => {
                console.log (error.name + ' ' + error.message);
                });
              }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dataService.setClientPerHour(this.data.id,this.perHour,this.client);
  }
  onClientChange(){
    this.clientPerHourHistory = this.clientPerHourHistoryInitial.where((x:any)=>x.clientId == this.clientForHistory || this.clientForHistory===0)
  }
}
