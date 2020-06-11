import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  genderOptions: string[];
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.genderOptions = [
      'male', 'female', 'other'
    ];
  }

  ngOnInit(): void {
  }

  newRegisterForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    name: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required
    ]),
    gender: new FormControl('', [
      Validators.required
    ])
  }, {validators: this.checkPasswords.bind(this)});

  get email(){
    return this.newRegisterForm.get('email');
  }
  get name(){
    return this.newRegisterForm.get('name');
  }
  get password(){
    return this.newRegisterForm.get('password');
  }
  get passwordConfirmation(){
    return this.newRegisterForm.get('passwordConfirmation');
  }
  get gender(){
    return this.newRegisterForm.get('gender');
  }

  getSelectValue(event) {
    const selectedValue = event[0];
    const inputName = event[1];
    this.newRegisterForm.get(inputName).setValue(selectedValue.toString().toUpperCase());
  }

  saveUser(event){
    event.preventDefault();

    this.isSubmitted = true;
  }

  checkPasswords(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('passwordConfirmation');

    return password === confirmPassword ? null : formGroup.get('passwordConfirmation').setErrors({'passwordNotMatch': true});
  }
}
