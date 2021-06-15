import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import data from './data';
import * as XLSX from 'xlsx';
import xlsxParser from "xlsx-parse-json";
import { stringify } from '@angular/compiler/src/util';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public file: File;
  private errors: any[];
  private header;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'Template.xlsx';

  public export() {
    //Excel Title, Header, Data
    const title = 'Car Sell Report';
    this.header = ["Sr. No", "Batch", "First Name", "Last Name", "Email", "Contact"];

    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sheet 1');
    //Add Header Row
    let headerRow = worksheet.addRow(this.header);
    //Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow([d.srNo, d.batch, d.firstName, d.lastName, d.Email, d.contact]);
    });
    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.getColumn(5).width = 50;
    worksheet.getColumn(6).width = 50;
    worksheet.addRow([]);
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data1) => {
      let blob = new Blob([data1], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'DemoData');
    })
  }

  public onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    const reader: FileReader = new FileReader();
    xlsxParser.onFileSelection(target.files[0]).then((data) => {
      this.errors = this.validateExcel(data['Sheet 1']);
    });
  }

  public uploadFile() {
    if (this.errors.length > 0) {
      alert('There is some invalid data uploaded file. Please check!!');
    }
  }


  //Validations
  private validSerialNo = (row, element, errors) => {
    const COLUMN = "sr. No";
    console.log(parseInt(element[COLUMN]));
    if (!element[COLUMN] || !/^\d+$/.test(element[COLUMN])) {
      errors.push({
        row: row,
        column: COLUMN,
        type: 'Sr. No should be in number format',
        value: element[COLUMN]
      });
    }
  };

  private validPhone = (row, element, errors) => {
    const COLUMN = "Contact";
    if (!element[COLUMN] || element[COLUMN].length < 10) {
      errors.push({
        row: row,
        column: COLUMN,
        type: 'Phone Number length should be equal to 10',
        value: element[COLUMN]
      });
    }
  };

  private validName = (row, element, errors, nameOfCol) => {
    const COLUMN = nameOfCol;
    if (!element[COLUMN]) {
      errors.push({
        row: row,
        column: COLUMN,
        type: 'Name Column should not be empty',
        value: element[COLUMN]
      });
    }
  };

  private validEmail = (row, element, errors) => {
    const COLUMN = 'Email';
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(element[COLUMN])) {
      errors.push({
        row: row,
        column: COLUMN,
        type: 'Email format is not correct',
        value: element[COLUMN]
      });
    }
  };

  private validateExcel = (rows) => {
    let errors = [];
    for (let i = 0; i < rows.length; i++) {
      let element = rows[i];
      this.validSerialNo(i, element, errors);
      this.validPhone(i, element, errors);
      this.validName(i, element, errors, 'First Name');
      this.validName(i, element, errors, 'Last Name');
      this.validEmail(i, element, errors);
    }
    return errors;
  };
}


