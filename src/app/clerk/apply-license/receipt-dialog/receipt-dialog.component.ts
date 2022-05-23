import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-receipt-dialog',
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.scss']
})
export class ReceiptDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
@Input() data;
@Input() licenseData;
@Input() packDt;
@Input() payInfo;
@Input() enrollment_no;
logoURL=environment.logoURL;
clientAddress1=environment.Address1;
clientAddress2=environment.Address2;
clientEmail=environment.Email;


  ngOnInit(): void {
  }
  print() {
    // printLForm('PrintReceipt');
    window.print();
  }

}
