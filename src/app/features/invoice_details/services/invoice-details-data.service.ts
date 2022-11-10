import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {InvoiceDetails} from '../models/InvoiceDetails';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Client } from './../../client/models/Client';

@Injectable()
export class InvoiceDetailsDataService {
  statuses = ['NEW', 'APPROVED','REJECTED']
  clients=[{id:0,clientName:''}];
  dataChange: BehaviorSubject<InvoiceDetails[]> = new BehaviorSubject<InvoiceDetails[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpCommonService) {
    this.httpClient.get('Client/GetClient').subscribe((data:any) => {
      this.clients = data;
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });

  }


  get data(): InvoiceDetails[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllInvoiceDetails(): void {
    this.httpClient.get('Invoice/GetInvoice').subscribe((data:any) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });

  }

  // DEMO ONLY, you can find working methods below
  addInvoiceDetails (InvoiceDetails: InvoiceDetails): void {
    this.dialogData = InvoiceDetails;
    let e = this.getClients().filter(x=>x.id===InvoiceDetails.clientId)[0]
    InvoiceDetails['clientName']= e.clientName;
    this.httpClient.post('Invoice/InsertInvoice',InvoiceDetails).subscribe((data:any) => {
      //this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  updateInvoiceDetails (InvoiceDetails: InvoiceDetails): void {
    this.dialogData = InvoiceDetails;
    let e = this.getClients().filter(x=>x.id===InvoiceDetails.clientId)[0]
    InvoiceDetails.clientName = e.clientName;
    this.httpClient.put('Invoice/UpdateInvoice',InvoiceDetails).subscribe((data:any) => {
      //this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  deleteInvoiceDetails (id: number): void {
    console.log(id);
    this.httpClient.delete('Invoice/DeleteInvoiceProduct/'+id).subscribe((data:any) => {
      //this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }
  getStatuses(){
    return this.statuses
  }
  getClients(){
    return this.clients
  }
}
