import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editConfirmDialogResult } from 'src/app/model/user-list.model';

@Component({
  selector: 'app-edit-confirm-dialog',
  templateUrl: './edit-confirm-dialog.component.html',
  styleUrls: ['./edit-confirm-dialog.component.scss']
})
export class EditConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: editConfirmDialogResult) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
