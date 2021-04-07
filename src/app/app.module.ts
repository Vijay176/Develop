import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDiplayComponent } from './user-diplay/user-diplay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatDialogRef, MatGridListModule, MatIconModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatToolbarModule, MAT_DIALOG_DATA } from '@angular/material';
import { EditConfirmDialogComponent } from './user-diplay/edit-confirm/edit-confirm-dialog/edit-confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { DeleteConfirmDialogComponent } from './user-diplay/delete-confirm/delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDiplayComponent,
    EditConfirmDialogComponent,
    DeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditConfirmDialogComponent, DeleteConfirmDialogComponent]
})
export class AppModule { }
