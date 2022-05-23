import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-remarks-dialog',
  templateUrl: './remarks-dialog.component.html',
  styleUrls: ['./remarks-dialog.component.css']
})


export class RemarksDialogComponent implements OnInit {
  sch_remarks:any;
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  constructor(
    public dialogRef: MatDialogRef<RemarksDialogComponent>

  ) {
   
  }

  ngOnInit(): void {
   
  }

  setRemarksInfo(){
    console.log("this.sch_remarks-----",this.sch_remarks)
    this.dialogRef.close({data:this.sch_remarks})
  }

  

}
