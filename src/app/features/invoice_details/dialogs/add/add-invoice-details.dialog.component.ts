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
  clients:any;
  statuses:any;
  terms :any;
  employees:any;
  product:any={employeeName:'',employeeId:0,perHourCost:0,totalHours:0,totalCost:0,projectId:0,invoiceId:0};
  products:any=[];

  constructor(public dialogRef: MatDialogRef<AddInvoiceDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: InvoiceDetails,
              public dataService: InvoiceDetailsDataService) {
                this.statuses = this.dataService.getStatuses()
                this.clients = this.dataService.getClients()
                this.terms = this.dataService.getTerms()
                this.employees = this.dataService.getEmployees()
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
    this.dataService.addInvoiceDetails(this.data,this.products);
  }
  public AddProduct(){
    this.products.push(this.product);
    this.product = {employeeName:'',employeeId:0,perHourCost:0,totalHours:0,totalCost:0,projectId:0,invoiceId:0};
  }

  public calculateTotalCost(){
    this.product.totalCost = this.product.perHourCost * this.product.totalHours;
  }
  public onEmployeeChange(){
    let e = this.employees.filter((x: any)=>x.id==this.product.employeeId)[0]
    this.product.employeeName = e.firstName+ ' '+ e.lastName;
    this.product.perHourCost = 10; // TODO :
    this.calculateTotalCost()
  }
}
