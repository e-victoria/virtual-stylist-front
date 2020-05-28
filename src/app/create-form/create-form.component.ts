import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  faCloudUploadAlt = faCloudUploadAlt;
  
  constructor() { }

  ngOnInit(): void {
  }

  newCardForm = new FormGroup({
    'category': new FormControl('', [
      Validators.required
    ]),
    'color': new FormControl('',[
      Validators.required
    ]),
    'style': new FormControl('',[
      Validators.required
    ]),
    'upload-photo__button': new FormControl('',[
      Validators.required
    ])
  });
}
