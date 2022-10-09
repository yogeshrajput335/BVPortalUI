import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/user-data.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-user.dialog',
  templateUrl: '../../dialogs/edit/edit-user.dialog.html',
  styleUrls: ['../../dialogs/edit/edit-user.dialog.css']
})
export class EditUserDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateUser(this.data);
  }
}
