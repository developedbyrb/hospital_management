import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  hide: boolean = true;
  constructor() { }
  
  ngOnInit(): void {
  }

  submit() {
    console.log('form submitted!');
  }
}
