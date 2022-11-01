import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-jobs-dialog',
  templateUrl: './jobs-dialog.component.html',
  styleUrls: ['./jobs-dialog.component.scss']
})
export class JobsDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<JobsDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any){

  }
   

  ngOnInit(): void {
  }

}
