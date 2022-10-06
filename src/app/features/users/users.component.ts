import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { UserDataSource, UserItem } from './user-datasource';
//import { TableDataSource, TableItem } from 'src/app/samples/table/table-datasource';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {

  //userList = [{username:'',password:'',email:'',isActive:false}]
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<UserItem>;
  //dataSource: UserDataSource | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userData:any
  displayedColumns = ['username', 'password', 'email', 'userType', 'isActive'];

  constructor(public httpService :HttpCommonService) {
    this.httpService.get('User/GetUsers').subscribe((data:any)=>
    //this.dataSource = new UserDataSource(data)
    //this.data = data
    //this.paginator.pageIndex
    //this.paginator.pageSize
    this.userData = data//.slice(this.paginator.pageIndex,this.paginator.pageIndex+this.paginator.pageSize)
    );

   }
  ngAfterViewInit(): void {
    // if(this.userData){
    //    this.dataSource.sort = this.sort;
    //    this.dataSource.paginator = this.paginator;
    //    this.table.dataSource = this.dataSource;
    //  }
  }

}
