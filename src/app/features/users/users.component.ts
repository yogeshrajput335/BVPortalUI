import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList = [{username:'',password:'',email:'',isActive:false}]
  constructor(public httpService :HttpCommonService) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails(){
    this.httpService.get('User/GetUsers').subscribe((data:any)=> this.userList = data);
  }

}
