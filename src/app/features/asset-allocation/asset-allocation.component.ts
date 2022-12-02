import { AssetAllocation } from './models/AssetAllocation';
import { HttpCommonService } from './../../core/services/httpCommon.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssetAllocationDataService } from './services/asset-allocation-data.service';
import { AssetAllocationDataSource } from './asset-allocation-datasource';
import { EditAssetAllocationDialogComponent } from './dialogs/edit/edit-asset-allocation.dialog.component';
import { DeleteAssetAllocationDialogComponent } from './dialogs/delete/delete-asset-allocation.dialog.component';
import { AddAssetAllocationDialogComponent } from './dialogs/add/add-asset-allocation.dialog.component';
import { Store } from '@ngrx/store';
import { increment } from 'src/app/core/store/counter.actions';

@Component({
  selector: 'app-asset-allocation',
  templateUrl: './asset-allocation.component.html',
  styleUrls: ['./asset-allocation.component.scss']
})
export class AssetAllocationComponent implements OnInit {
  displayedColumns = ['assetName', 'allocatedTo', 'allocatedBy', 'allocatedDate', 'returnDate', 'status', 'actions'];
  userDatabase?: AssetAllocationDataService | null;
  dataSource?: AssetAllocationDataSource | null;
  index?: number;
  id?: number;

  constructor(public httpClient: HttpCommonService,
    public dialog: MatDialog,
    public dataService: AssetAllocationDataService,
    private store: Store) {
      this.store.dispatch(increment({message:"Asset Allocation"}));
    }

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
    const dialogRef = this.dialog.open(AddAssetAllocationDialogComponent, {
      data: { user: AssetAllocation }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.userDatabase!.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, assetId: number, allocatedById: number, allocatedToId: number, allocatedDate: Date, returnDate: Date, status: string) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialog.open(EditAssetAllocationDialogComponent, {
      data: { id: id, assetId: assetId, allocatedById: allocatedById, allocatedToId: allocatedToId, allocatedDate: allocatedDate, returnDate: returnDate, status: status }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.userDatabase!.dataChange.value.findIndex(x => x.id === this.id);
        this.userDatabase!.dataChange.value[foundIndex] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, assetName: string, allocatedTo: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteAssetAllocationDialogComponent, {
      data: { id: id, assetName: assetName, allocatedTo: allocatedTo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.userDatabase!.dataChange.value.findIndex(x => x.id === this.id);
        this.userDatabase!.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    this.paginator!._changePageSize(this.paginator!.pageSize);
  }

  public loadData() {
    this.userDatabase = new AssetAllocationDataService(this.httpClient);
    this.dataSource = new AssetAllocationDataSource(this.userDatabase, this.paginator!, this.sort!);
    fromEvent(this.filter!.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter!.nativeElement.value;
      });
  }
}

