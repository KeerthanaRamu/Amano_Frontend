import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {
    super();
    this.authService.checkUserLoggedIn().subscribe(res=>{
      console.log("sign in ----res=======",res)
      if (res['status'] == 'Success') {
        if (res['data'].role_id === 1) {
          this.router.navigate(['/su/dashboard']);
        }else if (res['data'].role_id === 3) {
            this.router.navigate(['/admin/dashboard']);
        }else if (res['data'].role_id === 5) {
          this.router.navigate(['/pages/view-schedule']);
        }else if (res['data'].role_id === 6) {
          this.router.navigate(['/pages/view-schedule']);
        }else if (res['data'].role_id === 4) {
          this.router.navigate(['/clerk/students/add-student']);
        }
      }else{
        this.router.navigate(['/authentication/signin']);
      }
    })
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }
  get f() {
    return this.authForm.controls;
  }


  onSubmit() {
    let useCredentials= true;
    this.submitted = true;
    this.loading = true;
    if (this.authForm.invalid) {
      this.toastrService.error('Username and Password not valid !');
      return;
    } else {
      // this.getLogin();
      this.authService
        .login(this.f.username.value, this.f.password.value)
        .subscribe(
          (res) => {
              console.log("res-------",res);
              if(res['data'].length>0){
                  this.authService.currentUserSubject.next(true);
                  console.log("res['data'][0].role===",res['data'][0].role_id);
                  if (res['data'][0].role_id === 1) {
                    this.router.navigate(['/su/dashboard']);
                  }else if (res['data'][0].role_id === 3) {
                      this.router.navigate(['/admin/dashboard']);
                  }else if (res['data'][0].role_id === 5) {
                    this.router.navigate(['/pages/view-schedule']);
                  }else if (res['data'][0].role_id === 6) { 
                    this.router.navigate(['/pages/view-schedule']);
                  }else if (res['data'][0].role_id === 4) {
                    this.router.navigate(['/clerk/students/add-student']);
                  }
                  
                  this.loading = false;
            } else {
              this.toastrService.error('Invalid User');
              this.loading = false;
            }
          },
          (error) => {
            console.log("error========",error);
            this.toastrService.error(error);
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }

}
