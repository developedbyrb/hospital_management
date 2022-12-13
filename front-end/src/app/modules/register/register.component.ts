import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  confirmEmailFormControl = new FormControl('', [Validators.required, Validators.email]);
  resetEmailForm = this.formBuilder.group(
    {
      newEmail: this.emailFormControl,
      confirmEmail: this.confirmEmailFormControl,
    },
    {
      validator: this.ConfirmedValidator('newEmail', 'confirmEmail'),
    }
  );
  passwordFormControl = new FormControl('', [Validators.required, Validators.pattern(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
  )]);
  passwordConfirmationFormControl = new FormControl('', [Validators.required, Validators.pattern(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
  )]);
  resetPasswordForm = this.formBuilder.group(
    {
      newPassword: this.passwordFormControl,
      confirmPassword: this.passwordConfirmationFormControl,
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );
  hide: boolean = true;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  submit() {
    console.log('working');
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
