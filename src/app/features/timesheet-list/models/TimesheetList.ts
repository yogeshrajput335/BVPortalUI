export class TimesheetList {
  id!: number;
  employeeId!:number;
  employeeName!:string;
  projectId!: number;
  projectName! : string;
  weekEndingDate!: Date;
  month! : string; 
  year! : string; 
  createdDate! : string; 
  createdBy! : Date; 
  duration! :string;
  status!: string;
  detail:any;
}
