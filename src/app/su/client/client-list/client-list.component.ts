import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ClientService } from '../client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {
  data=[];
  filteredData = [];
  addClient:FormGroup;
  editClient:FormGroup;
  rowToDelete: any;
  submitDisable: boolean=false;
  profilePreview: any;
  constructor(
    private fb: FormBuilder,
    private clientService:ClientService,
    private modalService: NgbModal,
    private toastrService: ToastrService,private spinner: NgxSpinnerService) { }
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ngOnInit(): void {
    this.getClientList();
    this.addClient = this.fb.group({
      client_code: ['',Validators.required],
      client_name: ['',Validators.required],
      client_address: [''],
      client_logo: ['',Validators.required],
      client_logo_name:[''],
      client_logo_type:[''],
      contact_person:['',Validators.required],
      contact_designation:['',Validators.required],
      contact_mobileno:['',Validators.required],
      contact_emailid:['',Validators.required]
    });

    this.editClient = this.fb.group({
      id:[''],
      client_code: ['',Validators.required],
      client_name: ['',Validators.required],
      client_address: [''],
      client_logo: ['',Validators.required],
      client_logo_name:[''],
      client_logo_type:[''],
      contact_person:['',Validators.required],
      contact_designation:['',Validators.required],
      contact_mobileno:['',Validators.required],
      contact_emailid:['',Validators.required]
    });
  }

  columns = [
    { name: 'Client Code' },
    { name: 'Client Name' },
    { name: 'Address' },
  ]; 

  toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
 }

  getClientList(){
    this.spinner.show();
    this.clientService.getClientList()
    .subscribe(res=>{
      console.log("client--------",res);
      this.spinner.hide();
      this.data=res;
      this.filteredData=res;
      for(let i=0;i<this.filteredData.length;i++){
        if(this.filteredData[i].client_logo){
          const base64String = this.toBase64(this.filteredData[i].client_logo.data);
          this.filteredData[i].client_profile = 'data:image/jpg;base64,'+base64String;
        }
      }
    })
  }

  addRow(content) {
    this.clientService.getClientCode()
    .subscribe(res=>{
      this.addClient.patchValue({
        'client_code':res['clientCode']
      })
    })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size:'lg' });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const blob = new Blob([file],{type: event.target.files[0].type});
        this.addClient.patchValue({
          'client_logo':blob,
          'client_logo_name':event.target.files[0].name,
          'client_logo_type':event.target.files[0].type
        })
    }
  }

  setClientDetails(){
    var formData = new FormData();
    formData.append('clientData',JSON.stringify(this.addClient.value));
    formData.append('profile',this.addClient.value.client_logo);
    this.submitDisable=true;
    this.clientService.setClientDetails(formData)
    .subscribe(res=>{
      this.submitDisable=false;
      if(res['status'] == 'Success'){
        this.toastrService.success('Created Successfully!!');
        this.getClientList();
        this.modalService.dismissAll()
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }

  editRow(row, rowIndex, content) {
    this.profilePreview = row.client_profile;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg' });
    this.editClient.patchValue({
      id: row.id,
      client_code: row.client_code,
      client_name: row.client_name,
      client_address: row.client_address,
      client_logo: row.client_logo,
      contact_person:row.contact_person,
      contact_designation:row.contact_designation,
      contact_mobileno:row.contact_mobileno,
      contact_emailid:row.contact_emailid
    });  
  }

  onFileChangeUpdate(event) {
    this.profilePreview = '';
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const blob = new Blob([file],{type: event.target.files[0].type});
        this.editClient.patchValue({
          'client_logo':blob,
          'client_logo_name':event.target.files[0].name,
          'client_logo_type':event.target.files[0].type
        })
    }
  }

  updateClientDetails(){
    var formData = new FormData();
    formData.append('clientData',JSON.stringify(this.editClient.value));
    formData.append('profile',this.editClient.value.client_logo);
    this.clientService.updateClientDetails(formData)
    .subscribe(res=>{
      if(res['status'] == 'Success'){
        this.toastrService.success('Updated Successfully!!');
        this.getClientList();
        this.modalService.dismissAll()
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }
  
  deleteRow(row,rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.rowToDelete=row;
  }

  deleteClientDetails(){
    this.clientService.deleteClientDetails(this.rowToDelete)
    .subscribe(res=>{
      if(res['status'] == 'Success'){
        this.toastrService.success('Deleted Successfully!!');
        this.getClientList();
        this.modalService.dismissAll()
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
