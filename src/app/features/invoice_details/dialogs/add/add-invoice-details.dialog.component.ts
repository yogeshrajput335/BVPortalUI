import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {InvoiceDetails} from '../../models/InvoiceDetails';
import {InvoiceDetailsDataService } from '../../services/invoice-details-data.service';

@Component({
  selector: 'app-add-invoice-details.dialog',
  templateUrl: '../../dialogs/add/add-invoice-details.dialog.html',
  styleUrls: ['../../dialogs/add/add-invoice-details.dialog.css']
})

export class AddInvoiceDetailsDialogComponent {
  clients:any
  statuses:any
 
  constructor(public dialogRef: MatDialogRef<AddInvoiceDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: InvoiceDetails,
              public dataService: InvoiceDetailsDataService) {
                this.statuses = this.dataService.getStatuses()
                this.clients = this.dataService.getClients()
                
               }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addInvoiceDetails(this.data);
  }
}
