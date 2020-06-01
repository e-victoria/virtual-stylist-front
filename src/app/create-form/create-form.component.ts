import {Component, OnInit, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
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
  @Output()
  closeEvent: EventEmitter<string> = new EventEmitter<string>();

  newCardForm = new FormGroup({
    'category': new FormControl('', [
      Validators.required
    ]),
    'size': new FormControl(''),
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

  constructor() { }

  ngOnInit(): void {
    this.options = ['dress', 'jeans']
    this.colorOptions = ['red', 'white', 'black', 'green']
    this.sizeOptions = ['S', 'M', 'L', 'XL']
    this.styleOptions = ['casual', 'chick', 'sporty']
  }

  getSelectValue(event) {
    const selectedValue = event[0];
    const inputName = event[1];
    this.newCardForm.value[inputName] = selectedValue;
  }

  closeForm(event) {
    event.preventDefault();
    this.closeEvent.emit('close')
  }

  saveItem(event) {
    event.preventDefault();
    console.log(this.newCardForm.value)
  }

}
