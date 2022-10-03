import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  assetList=[{name:'',typeId:'',modelNumber:'',status:'',isActive:false}] 
  constructor(public httpService :HttpCommonService) { }

  ngOnInit(): void {
    this.getAssetDetails()
  }

  getAssetDetails(){
    this.httpService.get('Asset/GetAssets').subscribe((data:any)=> this.assetList = data);
  }
}
