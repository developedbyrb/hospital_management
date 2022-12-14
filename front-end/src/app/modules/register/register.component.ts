import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private localStorageService: LocalStorageService, private _snackBar: MatSnackBar, private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registrationForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmEmail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]),
        confirmPassword: new FormControl('', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]),
      },
      {
        validator: [this.ConfirmedValidator('email', 'confirmEmail'), this.ConfirmedValidator('password', 'confirmPassword')],
      }
    );
  }

  submit() {
    if (!this.registrationForm.valid) {
      return;
    }
    const userData = [
      {
        'email': this.registrationForm.controls['email'].value,
        'confirm_email': this.registrationForm.controls['confirmEmail'].value,
        'password': this.registrationForm.controls['password'].value,
        'confirm_password': this.registrationForm.controls['confirmPassword'].value,
      }
    ];
    let storedUserData: any = this.localStorageService.getItems('USERDATA');
    if (storedUserData) {
      storedUserData = JSON.parse(storedUserData);
      let checkUserExist = storedUserData.filter((q: any) => {
        return q.email == this.registrationForm.controls['email'].value
      });
      if (checkUserExist.length > 0) {
        this.snackBar.openSnackBar('User already Exist!', 'error', 100000);
        return;
      }
      storedUserData.push(userData[0]);
      this.localStorageService.setItem('USERDATA', JSON.stringify(storedUserData));
    } else {
      this.localStorageService.setItem('USERDATA', JSON.stringify(userData));
    }
    this.snackBar.openSnackBar('Registration done success-fully!', 'success', 100000);
    this.initializeForm();
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  };
}
