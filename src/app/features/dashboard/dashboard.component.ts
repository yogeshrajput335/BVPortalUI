import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  public pieChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    //firstRowIsData: true,
    options: {'title': 'Tasks'},
  };

  public tableChart: GoogleChartInterface = {
    chartType: 'Table',
    dataTable: [
      ['Name',   'Manager', 'Tooltip'],
      [{v: 'Gajendra', f: 'Gajendra<div style="color:red; font-style:italic">Manager</div>'}, '', 'The President'],
      [{v: 'Rohit', f: 'Rohit<div style="color:red; font-style:italic">Team Lead</div>'}, 'Gajendra', 'VP'],
      [{v:'Suchit', f: 'Suchit<div style="color:red; font-style:italic">Sr. Engineer</div>'}, 'Rohit', 'SE'],
      [{v:'Ajay', f: 'Suchit<div style="color:red; font-style:italic">Sr. Engineer</div>'}, 'Rohit', 'SE'],
      [{v:'Ishan', f: 'Ishan<div style="color:red; font-style:italic">Engineer</div>'}, 'Ajay', 'JE']
    ],
    options: {
      allowHtml: true,
      allowCollapse: true
    }
  };

  public barChart: GoogleChartInterface = {
    chartType: GoogleChartType.BarChart,
    dataTable: [
      ['Name', 'Working Hours per Week'],
      ['Gajendra',     60],
      ['Rohit',      55],
      ['Suchit',  47],
      ['Ajay', 66],
      ['Ishan',    49]
    ],
    //firstRowIsData: true,
    options: {'title': 'Tasks'},
  };

  constructor(private breakpointObserver: BreakpointObserver) {}
}
