import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JobsDialogComponent } from '../jobs/jobs-dialog/jobs-dialog.component';

@Component({

  selector: 'app-jobs',

  templateUrl: './jobs.component.html',

  styleUrls: ['./jobs.component.scss']

})

export class JobsComponent implements OnInit {
 

  jobs:any[] = [];
  constructor(public httpClient: HttpCommonService ,
              public dialog: MatDialog, ) { }
  
              addJobs(): void {
                const dialogRef = this.dialog.open(JobsDialogComponent, {
                  
                });
            
                dialogRef.afterClosed().subscribe(result => {
                  console.log('The dialog was closed');
                  });
              }

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.httpClient.get('Openjobs/GetOpenjobs').subscribe((data:any) => {
      this.jobs = data;
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });

  }

}
