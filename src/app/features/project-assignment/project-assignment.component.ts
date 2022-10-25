import { ProjectAssignment} from './models/ProjectAssignment';
import { HttpCommonService } from './../../core/services/httpCommon.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectAssignmentDataService} from './services/project-assignment-data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';

import {EditProjectAssignmentDialogComponent} from './dialogs/edit/edit-project-assignment.dialog.component';
import {DeleteProjectAssignmentDialogComponent} from './dialogs/delete/delete-project-assignment.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ProjectAssignmentDataSource } from './project-assignment-datasource';
import { AddProjectAssignmentDialogComponent } from './dialogs/add/add-project-assignmnet.dialog.component';

@Component({
  selector: 'app-project-assignment',
  templateUrl: './project-assignment.component.html',
  styleUrls: ['./project-assignment.component.scss']
})
export class ProjectAssignmentComponent implements OnInit {
  displayedColumns = ['projectName', 'employeeName', 'notes', 'startDate', 'endDate',  'actions'];
  ProjectAssignmentDatabase?: ProjectAssignmentDataService | null;
  dataSource?: ProjectAssignmentDataSource | null;
  index?: number;
  id?: number;


  constructor(public httpClient: HttpCommonService,
    public dialog: MatDialog,
    public dataService: ProjectAssignmentDataService) { }

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
    const dialogRef = this.dialog.open(AddProjectAssignmentDialogComponent, {
      data: {user:  ProjectAssignment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.ProjectAssignmentDatabase!.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, projectId : number, employeeId: number, notes:string, startDate: Date, endDate:Date) {
    this.id = id;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditProjectAssignmentDialogComponent, {
      data: {id: id, projectId: projectId, employeeId: employeeId,  notes:  notes, startDate: startDate, endDate: endDate}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.ProjectAssignmentDatabase!.dataChange.value.findIndex(x => x.id === this.id);
        this.ProjectAssignmentDatabase!.dataChange.value[foundIndex] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, projectId: number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteProjectAssignmentDialogComponent, {
      data: {id: id, projectId: projectId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.ProjectAssignmentDatabase!.dataChange.value.findIndex(x => x.id === this.id);
        this.ProjectAssignmentDatabase!.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    this.paginator!._changePageSize(this.paginator!.pageSize);
  }

  public loadData() {
    this.ProjectAssignmentDatabase = new ProjectAssignmentDataService(this.httpClient);
    this.dataSource = new ProjectAssignmentDataSource(this.ProjectAssignmentDatabase, this.paginator!, this.sort!);
    fromEvent(this.filter!.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter!.nativeElement.value;
      });
  }
}


