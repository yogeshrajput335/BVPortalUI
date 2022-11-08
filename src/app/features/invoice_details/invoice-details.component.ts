import { HttpCommonService } from './../../core/services/httpCommon.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {InvoiceDetails} from './models/InvoiceDetails';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { InvoiceDetailsDataSource } from './invoice-details-datasource';
import { InvoiceDetailsDataService } from './services/invoice-details-data.service';
import { AddInvoiceDetailsDialogComponent } from './dialogs/add/add-invoice-details.dialog.component';
import { EditInvoiceDetailsDialogComponent } from './dialogs/edit/edit-invoice-details.dialog.component';

import { NumberFormatStyle } from '@angular/common';
import { DeleteInvoiceDetailsDialogComponent } from './dialogs/delete/delete-invoice_details.dialog.component';


@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  displayedColumns = ['invoiceId', 'employeeId', 'projectId', 'perHourCost', 'totalHours','totalCost', 'actions'];
  userDatabase?: InvoiceDetailsDataService | null;
  dataSource?: InvoiceDetailsDataSource | null;
  index?: number;
  id?: number;

  constructor(public httpClient: HttpCommonService,
              public dialog: MatDialog,
              public dataService: InvoiceDetailsDataService) {}

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort?: MatSort;
  @ViewChild('filter',  {static: true}) filter?: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddInvoiceDetailsDialogComponent, {
      data: {user: InvoiceDetails}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside UserDataService
        this.userDatabase!.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, invoiceId: number, employeeId: number, projectId: number, perHourcost: number, totalHours:number, totalCost:NumberFormatStyle) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditInvoiceDetailsDialogComponent, {
      data: {id: id, invoiceId: invoiceId, employeeId: employeeId, projectId: projectId, perHourcost:perHourcost,totalHours:totalHours, totalCost:totalCost}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside UserDataService by id
        const foundIndex = this.userDatabase!.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.userDatabase!.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, invoiceId: number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteInvoiceDetailsDialogComponent, {
      data: {id: id, invoiceId: invoiceId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.userDatabase!.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from UserDataService
        this.userDatabase!.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator!._changePageSize(this.paginator!.pageSize);
  }


  public loadData() {
    this.userDatabase = new InvoiceDetailsDataService(this.httpClient);
    this.dataSource = new InvoiceDetailsDataSource(this.userDatabase, this.paginator!, this.sort!);
    fromEvent(this.filter!.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter!.nativeElement.value;
      });
  }
}

