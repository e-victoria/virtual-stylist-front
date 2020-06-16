import { Component, OnInit } from '@angular/core';
import IProfile from './profile.model';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: IProfile;
  faPen = faPen;
  isSubmitted: boolean = false;
  genderOptions: string[];
  newInfo: IProfile;

  editForm: FormGroup = new FormGroup({
    gender: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl(''),
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getUserData();
    this.getSelectOptions();
  }

  get name() {
    return this.editForm.get('name');
  }

  get gender(){
    return this.editForm.get('gender');
  }

  get email(){
    return this.editForm.get('email');
  }
  get password(){
    console.log(this.editForm.get('password'));
    return this.editForm.get('password');
  }

  getSelectValue(event) {
    const selectedValue = event[0];
    const inputName = event[1];
    this.editForm.get(inputName).setValue(selectedValue.toString().toUpperCase());
  }


  getUserData() {
    this.profileService.getUserData().subscribe({
      next: data => {
        this.profile = data;
        for (let i = 0; i < Object.keys(data).length; i++) {
          if (this.editForm.get(Object.keys(data)[i])) {
            this.editForm.get(Object.keys(data)[i]).setValue(data[Object.keys(data)[i]]);
          }
        }
      }
    });
  }

  activateEditMode(event){
    event.stopPropagation();
    event.preventDefault();
    const input = event.currentTarget.parentNode.querySelector('.profile__details-content--disabled');
    const label = event.currentTarget.parentNode.querySelector('.profile-details__label');
    const select = event.currentTarget.parentNode.querySelector('.profile-details__select');
    if(label && select) {
      label.classList.toggle('hide');
      select.classList.toggle('show-flex');
    }

    if(input) {
      input.removeAttribute('disabled');
      input.classList.add('profile__details-content--active');
    }
  }

  getSelectOptions() {
    this.profileService.getSelectOptions().subscribe({
      next: options => {
        this.genderOptions = options['Gender'];
      }
    });
  }

  saveChanges(event) {
    event.preventDefault();

    console.log(this.editForm.value);

    const getResponse = (response) => {
      console.log(response);
    }
    this.newInfo = this.editForm.value;
    this.profileService.saveChanges(this.newInfo, getResponse);
    this.isSubmitted = true;
  }
}
