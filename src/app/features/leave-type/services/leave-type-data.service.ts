import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LeaveType} from '../models/LeaveType';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';

@Injectable()
export class LeaveTypeDataService {

  dataChange: BehaviorSubject<LeaveType[]> = new BehaviorSubject<LeaveType[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpCommonService) {}

  get data(): LeaveType[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllLeaveTypes(): void {
    this.httpClient.get('LeaveType/GetLeaveTypes').subscribe((data:any) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addLeaveType (leaveType: LeaveType): void {
    this.dialogData = leaveType;
  }

  updateLeaveType (leaveType: LeaveType): void {
    this.dialogData = leaveType;
  }

  deleteLeaveType (id: number): void {
    console.log(id);
  }
}



