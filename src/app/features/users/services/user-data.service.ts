import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/User';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';

@Injectable()
export class UserDataService {
  statuses = ['ACTIVE', 'INACTIVE']
  userTypes = ['ADMIN', 'EMPLOYEE']
  employees:any[] =[]

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  dialogData: any;

  constructor (private httpClient: HttpCommonService) {
    this.httpClient.get('Employee/GetEmployee').subscribe((data:any) => {
      this.employees = data;
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllUsers(): void {
    this.httpClient.get('User/GetUsers').subscribe((data:any) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  addUser (user: User): void {
    let emp = this.getEmployees().filter(x=>x.id===user.employeeId)[0]
    user.employee = emp.firstName +" "+emp.lastName;
    this.dialogData = user;
    this.httpClient.post('User/InsertUser',user).subscribe((data:any) => {
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  updateUser (user: User): void {
    let emp = this.getEmployees().filter(x=>x.id===user.employeeId)[0]
    user.employee = emp.firstName +" "+emp.lastName;
    this.dialogData = user;
    this.httpClient.put('User/UpdateUser',user).subscribe((data:any) => {
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  deleteUser (id: number): void {
    this.httpClient.delete('User/DeleteUser/'+id).subscribe((data:any) => {
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  getStatues(){
    return this.statuses
  }

  getUserTypes(){
    return this.userTypes
  }

  getEmployees(){
    return this.employees
  }
}
