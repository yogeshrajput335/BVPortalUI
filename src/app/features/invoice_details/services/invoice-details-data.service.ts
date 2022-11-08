import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {InvoiceDetails} from '../models/InvoiceDetails';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';

@Injectable()
export class InvoiceDetailsDataService {
  statuses = ['ACTIVE', 'INACTIVE']

  dataChange: BehaviorSubject<InvoiceDetails[]> = new BehaviorSubject<InvoiceDetails[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpCommonService) {
  }

  get data(): InvoiceDetails[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllInvoiceDetails(): void {
    this.httpClient.get('InvoiceProduct/GetInvoiceProduct').subscribe((data:any) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });

  }

  // DEMO ONLY, you can find working methods below
  addInvoiceDetails (user: InvoiceDetails): void {
    this.dialogData = user;
    this.httpClient.post('InvoiceProduct/InsertInvoiceProduct',user).subscribe((data:any) => {
      //this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  updateInvoiceDetails (user: InvoiceDetails): void {
    this.dialogData = user;
    this.httpClient.put('InvoiceProduct/UpdateInvoiceProduct',user).subscribe((data:any) => {
      //this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  deleteInvoiceDetails (id: number): void {
    console.log(id);
    this.httpClient.delete('InvoiceProduct/DeleteInvoiceProduct/'+id).subscribe((data:any) => {
      //this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }
}
