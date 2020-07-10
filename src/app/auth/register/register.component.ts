import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import User from '../../user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hasResponse = false;
  genderOptions: string[];
  isSubmitted = false;
  isSuccess = false;
  emailExists = false;
  isServerError = false;
  isPopup = false;
  @Output()
  isPopupEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private registerService: RegisterService, private router: Router) {
    this.genderOptions = [
      'male', 'female', 'other'
    ];
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

    const getResponse = (response) => {
      this.hasResponse = true;
      if (response?.error === 'The email is already registered') {
        this.emailExists = true;
      } else if (!response?.error) {
        this.isSuccess = true;
      } else {
        this.isServerError = true;
      }
    };

    if (this.newRegisterForm.valid) {
      this.registerService.registerNewUser(this.newRegisterForm.value as User, getResponse);
    }
  }

  showGuestMessage(event) {
    event.preventDefault();
    if (this.newRegisterForm.valid) {
      this.isPopupEmitter.emit(true);
      this.isPopup = true;
    }
  }

  checkPasswords(formGroup: FormGroup) {
    this.registerService.checkPasswords(formGroup);
  }
}

