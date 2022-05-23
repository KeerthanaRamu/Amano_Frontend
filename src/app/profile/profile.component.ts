import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../environments/environment';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails: any;
  newLogo;
  securityForm:FormGroup;
  accountsForm:FormGroup;
  newLogoType: any;
  userImg;
  apiURL: string;

  constructor(private fb: FormBuilder,private authService: AuthService,
    private toastrService: ToastrService,private spinner:NgxSpinnerService) {

      this.apiURL=environment.apiUrl;

    }
  ngOnInit() {

    this.securityForm = this.fb.group({
      user_name: ['',Validators.required],
      new_username:['',Validators.required],
      password:['',Validators.required],
      current_password: ['',Validators.required],
      new_password: ['',Validators.required],
    });

    this.accountsForm = this.fb.group({
      name: ['',Validators.required],
      mobile_no: ['',Validators.required],
      email_id: ['',Validators.required],
      profile:[''],
      profile_type:['']
    });

    this.authService.checkUserLoggedIn()
    .subscribe(res=>{
      const userRole = res['data'].role;
      this.userDetails = res['data'];
      this.userImg = res['data'].img;
      this.securityForm.patchValue({
        user_name:this.userDetails.user_name,
        new_username:this.userDetails.user_name,
        password:this.userDetails.password
      });


      this.accountsForm.patchValue({
        name:this.userDetails.name,
        mobile_no: this.userDetails.mobile_no,
        email_id: this.userDetails.email_id,
        profile:this.userDetails.img
      })
    })

  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.newLogo=file;
      this.newLogoType=event.target.files[0].type
    }
  }

  onFileChangeProfile(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.accountsForm.patchValue({
        profile:file,
        profile_type:event.target.files[0].type
      })
    }
  }

  updateClientLogo(){
    if(this.newLogo){
      var formData = new FormData();
      formData.append('newLogo',this.newLogo);
      formData.append('newLogoType',this.newLogoType);
      this.authService.updateClientLogo(formData)
      .subscribe(res=>{
          this.authService.currentUserSubject.next(true);
          this.toastrService.success("Updated Successfully!!!")
      })
    }
  }

  updateUserCredentials(){
    this.spinner.show();
  if(this.securityForm.value.password == this.securityForm.value.current_password){
      this.authService.updateUserCredentials(this.securityForm.value)
      .subscribe(res=>{
        this.spinner.hide();
        if(res['status'] == 'Success'){
          this.authService.currentUserSubject.next(true);
          this.toastrService.success("Updated Successfully!!!")
        }else{
          this.toastrService.error('User Name Already Exists!!')
        }
          
      })
  }else{
    this.toastrService.error("Current Password is not Correct!!")
  }
    
  }

  updateAccountDetails(){
    this.spinner.show();
    var formData = new FormData();
    formData.append('baseRoot','root/Employee/'+this.securityForm.value.new_username);
    formData.append('accountData',JSON.stringify(this.accountsForm.value));
    formData.append('file',this.accountsForm.value.profile);
    this.authService.updateAccountDetails(formData)
      .subscribe(res=>{
        this.spinner.hide();
          this.authService.currentUserSubject.next(true);
          this.toastrService.success("Updated Successfully!!!");
          this.authService.checkUserLoggedIn()
          .subscribe(res=>{
            const userRole = res['data'].role;
            this.userDetails = res['data'];
            this.securityForm.patchValue({
              user_name:this.userDetails.user_name,
              new_username:this.userDetails.user_name,
              password:this.userDetails.password
            });


            this.accountsForm.patchValue({
              name:this.userDetails.name,
              mobile_no: this.userDetails.mobile_no,
              email_id: this.userDetails.email_id,
              profile:this.userDetails.img
            })
          })
    })
  }
  
}
