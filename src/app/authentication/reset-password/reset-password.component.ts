import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public hide = true;
  password: string
  Rpassword: string;
  matcher = new MyErrorStateMatcher();
  private _token: string;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,private _formBuilder: FormBuilder, 
  ) {}
  ngOnInit() {
    this._token = this.route.snapshot.paramMap.get('id');
    this.resetPasswordForm = this._formBuilder.group({
      password: [
        Validators.required,
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)
      ],
      confirmPassword: ['']
    }, { validators: this.checkPasswords }
    );
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

 
  public resetPassword(resetPasswordFormValue) {
    this.loading = true;
    let resetInfo = {
      authToken: this._token,
      password: resetPasswordFormValue
    }
    this.authService.updatePasswordDetails(resetInfo).subscribe(res => {
      this.loading = false;
      if (res.status == "Success") {
        this.toastrService.success("Password Updated Sucessfully");
        this.router.navigate(['/authentication/signin']);
      }
      else { this.toastrService.error("Something Went Worng. Please Try Again."); }
    })

  }

}
