import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import * as data from '../../assets/JsonData/userData.json';
import { DeleteConfirmDialogComponent } from './delete-confirm/delete-confirm-dialog/delete-confirm-dialog.component';
import { EditConfirmDialogComponent } from './edit-confirm/edit-confirm-dialog/edit-confirm-dialog.component';
import { UserList } from './../model/user-list.model';

const ELEMENT_DATA: UserList[] = (data as any).default;

@Component({
  selector: 'app-user-diplay',
  templateUrl: './user-diplay.component.html',
  styleUrls: ['./user-diplay.component.scss']
})
export class UserDiplayComponent implements OnInit{

  displayedColumns: string[] = ['Select', 'Name', 'Email', 'Gender', 'Address', 'Actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<UserList>(true, []);
  maleUsers = 0;
  femaleUsers = 0;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
  constructor(private readonly dialog: MatDialog) { }

  ngOnInit() {
    this.countProgress();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  columnsToDisplay: string[] = this.displayedColumns.slice();

  editEvent(value: number) {
    const dialogRef = this.dialog.open(EditConfirmDialogComponent, {
      width: '75%',
      id: value.toString(),
      data: this.dataSource.data.filter((element) => element.Id === value)
    });

    dialogRef.afterClosed().subscribe(result => {
      this.countProgress();
    });
  }

  countProgress() {
    this.maleUsers = 0;
    this.femaleUsers = 0;
    this.dataSource.data.forEach((element) => {
      if (element.Gender.toString() === 'Male') {
        this.maleUsers++;
      } else {
        this.femaleUsers++;
      }
    });
  }

  deleteEvent(value: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '65%',
      id: value.toString(),
      data: this.dataSource.data.filter((element) => element.Id === value)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteUser(value);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.countProgress();
      }
    });
  }

  deleteUser(id: number) {
    this.dataSource.data.forEach((element, index) => {
      if (element.Id === id) {
        this.dataSource.data.splice(index, 1);
      }
    });

  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Name + 1}`;
  }
  }
