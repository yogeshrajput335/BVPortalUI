import { HttpClient, HttpErrorResponse } from '@angular/common/http';
<<<<<<< HEAD

=======
>>>>>>> a5e749fa44920f1f171dd4f3840322efa1bccff6
import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';

import { HttpCommonService } from 'src/app/core/services/httpCommon.service';



@Component({

  selector: 'app-jobs',

  templateUrl: './jobs.component.html',

  styleUrls: ['./jobs.component.scss']

})

export class JobsComponent implements OnInit {

<<<<<<< HEAD


  jobs:any[] = [];

  constructor(public httpClient: HttpCommonService) { }



  ngOnInit(): void {

    this.getAllJobs();
=======
  jobs:any[] = [];
  constructor(public httpClient: HttpCommonService) { }

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.httpClient.get('Openjobs/GetOpenjobs').subscribe((data:any) => {
      this.jobs = data;
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
>>>>>>> a5e749fa44920f1f171dd4f3840322efa1bccff6

  }



  getAllJobs(): void {

    this.httpClient.get('Openjobs/GetOpenjobs').subscribe((data:any) => {

      this.jobs = data;

      },

      (error: HttpErrorResponse) => {

      console.log (error.name + ' ' + error.message);

      });



  }



}