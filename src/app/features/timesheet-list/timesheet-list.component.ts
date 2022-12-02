import { HttpCommonService } from './../../core/services/httpCommon.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TimesheetListDataService } from './services/timesheet-list-data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { AddTimesheetListDialogComponent } from './dialogs/add/add-timesheet-list.dialog.component';
import { EditTimesheetListDialogComponent } from './dialogs/edit/edit-timesheet-list.dialog.component';
import { DeleteTimesheetListDialogComponent } from './dialogs/delete/delete-timesheet-list.dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimesheetListDataSource } from './timesheet-list-datasource';
import { TimesheetList } from './models/TimesheetList';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss']
})

export class TimesheetListComponent implements OnInit {
  displayedColumns = ['employeeName', 'projectName', 'weekEndingDate', 'status', 'actions'];
  TimesheetListDatabase?: TimesheetListDataService | null;
  dataSource?: TimesheetListDataSource | null;
  index?: number;
  id?: number;

  constructor(public httpClient: HttpCommonService,
    public dialog: MatDialog,
    public dataService: TimesheetListDataService) { }

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddTimesheetListDialogComponent, {
      data: { user: TimesheetList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.TimesheetListDatabase!.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, employeeId: number, projectId: number, weekEndingDate: Date, status: string) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialog.open(EditTimesheetListDialogComponent, {
      data: { id: id, employeeId: employeeId, projectId: projectId, status: status }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.TimesheetListDatabase!.dataChange.value.findIndex(x => x.id === this.id);
        this.TimesheetListDatabase!.dataChange.value[foundIndex] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, employeeName: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteTimesheetListDialogComponent, {
      data: { id: id, employeeName: employeeName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.TimesheetListDatabase!.dataChange.value.findIndex(x => x.id === this.id);
        this.TimesheetListDatabase!.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.paginator!._changePageSize(this.paginator!.pageSize);
  }

  public loadData() {
    this.TimesheetListDatabase = new TimesheetListDataService(this.httpClient);
    this.dataSource = new TimesheetListDataSource(this.TimesheetListDatabase, this.paginator!, this.sort!);
    fromEvent(this.filter!.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter!.nativeElement.value;
      });
  }
}