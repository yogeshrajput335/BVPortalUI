import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee } from './models/Employee';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeDataService } from './services/employee-data.service';

export class EmployeeDataSource extends DataSource<Employee> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Employee[] = [];
  renderedData: Employee[] = [];

  constructor(public _exampleDatabase: EmployeeDataService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    this._exampleDatabase.getAllEmployee();
  }

  connect(): Observable<Employee[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllEmployee();

    return merge(...displayDataChanges).pipe(map(() => {
      this.filteredData = this._exampleDatabase.data.slice().filter((issue: Employee) => {
        const searchStr = (issue.id + issue.firstName + issue.lastName + issue.phoneNumber + issue.email).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      const sortedData = this.sortData(this.filteredData.slice());

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }

  sortData(data: Employee[]): Employee[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
        case 'lastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;
        case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
        case 'phoneNumber': [propertyA, propertyB] = [a.phoneNumber, b.phoneNumber]; break;
        case 'employeeType': [propertyA, propertyB] = [a.employeeType, b.employeeType]; break;
        case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
