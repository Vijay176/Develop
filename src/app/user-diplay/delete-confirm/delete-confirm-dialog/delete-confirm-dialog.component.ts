import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { editConfirmDialogResult } from 'src/app/model/user-list.model';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: editConfirmDialogResult) {
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
