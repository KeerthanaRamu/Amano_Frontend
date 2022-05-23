import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MessageService } from '../message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
  
@Component({
  selector: 'app-message-list',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
 
  data=[];
  filteredData = [];
  addMessageForm:FormGroup;
  editMessageForm:FormGroup;
  rowToDelete: any;
  messageList:any;

  hide = true;

  constructor(
    private fb: FormBuilder,
    private messageService:MessageService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService) { }
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ngOnInit(): void {
    this.getMessageList();
    this.getMessageDetails();
    this.addMessageForm = this.fb.group({
      message_type: ['',Validators.required],
      message_english: ['',Validators.required],
      message_malay: ['',Validators.required],
    });

    this.editMessageForm = this.fb.group({
      id:[''],
      message_type: ['',Validators.required],
      message_english: ['',Validators.required],
      message_malay: ['',Validators.required],
    });
  }

  columns = [
    { name: 'Message Type' }
  ]; 

  getMessageList(){
    this.messageService.getMessageList()
    .subscribe(res=>{
      console.log("getMessageList--------",res);
      this.messageList=res['data'];
    })
  }


  getMessageDetails(){
    this.messageService.getMessageDetails()
    .subscribe(res=>{
      console.log("getRetestDetails--------",res);
      this.data=res['data'];
      this.filteredData=res['data'];
    })
  }

  

  addRow(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg' });
  }

  checkMessagetExists(){
    this.messageService.checkMessagetExists(this.addMessageForm.value.message_type)
    .subscribe(res=>{
        if(res['status'] == 'Exists'){
          this.toastrService.error('Already Exists!!!');
          this.addMessageForm.patchValue({
            'message_type':''
          })
        }else if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }
    })
  }
  

  setMessageDetails(){
    this.spinner.show();
    this.messageService.setMessageDetails(this.addMessageForm.value)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Created Successfully!!');
        this.getMessageDetails();
        this.modalService.dismissAll()
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }

  editRow(row, rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size:'lg' });
    console.log("row====",row)
    this.editMessageForm.patchValue({
      id: row.id,
      message_type: row.status_id,
      message_english: row.message_english,
      message_malay: row.message_malay,
    });  
  }

  

  updateMessageDetails(){
    this.spinner.show();
    this.messageService.updateMessageDetails(this.editMessageForm.value)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Updated Successfully!!');
        this.getMessageDetails();
        this.modalService.dismissAll()
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }
  
  deleteRow(row,rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.rowToDelete=row;
  }

  deleteMessageDetails(){
    this.spinner.show();
    this.messageService.deleteMessageDetails(this.rowToDelete)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Deleted Successfully!!');
        this.getMessageDetails();
        this.modalService.dismissAll()
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }

  filterDatatable(event) {
      // get the value of the key pressed and make it lowercase
      const val = event.target.value.toLowerCase();
      // get the amount of columns in the table
      const colsAmt = this.columns.length;
      // get the key names of each column in the dataset
      const keys = Object.keys(this.filteredData[0]);
      // assign filtered matches to the active datatable
      this.data = this.filteredData.filter(function (item) {
        // iterate through each row's column data
        for (let i = 0; i < colsAmt; i++) {
          // check for a match
          if (
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
            !val
          ) {
            // found match, return true to add to result set
            return true;
          }
        }
      });
      // whenever the filter changes, always go back to the first page
      this.table.offset = 0;
  }

}
