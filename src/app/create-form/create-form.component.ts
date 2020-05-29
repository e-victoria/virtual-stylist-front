import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faCloudUploadAlt, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  @ViewChild('selectList')
  private selectList: ElementRef;
  @ViewChild('arrowDown')
  private arrowDown: ElementRef;
  @ViewChild('selectLabel')
  private selectLabel: ElementRef;
  faCloudUploadAlt = faCloudUploadAlt;
  options: string[];
  colorOptions: string[];
  sizeOptions: string[];
  styleOptions: string[];


  constructor() { }

  ngOnInit(): void {
    this.options = ['dress', 'jeans']
    this.colorOptions = ['red', 'white', 'black', 'green']
    this.sizeOptions = ['S', 'M', 'L', 'XL']
    this.styleOptions = ['casual', 'chick', 'sporty']
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

  seeValue(event) {
    console.log(event);
  }

}
