import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {ClientDataService} from '../../services/client-data.service';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-set-term.dialog',
  templateUrl: '../../dialogs/set-term/set-term.dialog.html',
  styleUrls: ['../../dialogs/set-term/set-term.dialog.css']
})
export class SetTermClientDialogComponent {
  term:any
  termHistory:any
  constructor(public dialogRef: MatDialogRef<SetTermClientDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ClientDataService,
              private httpClient: HttpCommonService) {
                this.term = data.term;
                this.httpClient.get('Client/GetClientTermHistory/'+this.data.id).subscribe((data:any) => {
                  //this.dataChange.next(data);
                  this.termHistory = data;
                },
                (error: HttpErrorResponse) => {
                console.log (error.name + ' ' + error.message);
                });
              }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dataService.setTerm(this.data.id,this.term);
  }
}
