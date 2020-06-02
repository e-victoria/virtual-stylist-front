import {Component, OnInit, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import {CreateFormService} from "./create-form.service";

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
  private imageToSend: FormGroup = this.formBuilder.group({
    image: ['']
  });

  newCardForm: FormGroup = new FormGroup({
    'clothType': new FormControl('', [
      Validators.required
    ]),
    'size': new FormControl(''),
    'color': new FormControl('',[
      Validators.required
    ]),
    'brand': new FormControl(''),
    'shopLink': new FormControl(''),
    'tag': new FormControl(''),
    'style': new FormControl('',[
      Validators.required
    ]),
    'code': new FormControl(''),
    'imagePath': new FormControl('',[
      Validators.required
    ])
  });

  constructor(private createFormService: CreateFormService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.options = ['BLOUSE', 'T-SHIRT', 'TOP', 'TROUSERS', 'DRESS', 'JEANS'];
    this.colorOptions = ['WHITE', 'BLACK', 'RED'];
    this.sizeOptions = ['S', 'M', 'L', 'XL'];
    this.styleOptions = ['CASUAL', 'CLASSIC'];
  }

  getSelectValue(event) {
    const selectedValue = event[0];
    const inputName = event[1];
    this.newCardForm.get(inputName).setValue(selectedValue);
  }

  closeForm(event) {
    event.preventDefault();
    this.closeEvent.emit('close')
  }

  saveImage(event) {
    event.preventDefault();

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newCardForm.get('imagePath').setValue('smth');
      this.imageToSend.get('image').setValue(file);
    }
  }

  saveItem(event) {

    event.preventDefault();

    const getImagePath = (path) => {
      console.log(path);
      this.newCardForm.value.imagePath = path;

      const getResponse = (response) => {
        console.log(response)
      }

      this.createFormService.saveClothes(this.newCardForm.value, getResponse);
    }
    const formData = new FormData();
    formData.append('file', this.imageToSend.get('image').value);

    if (this.newCardForm.valid) {
      this.createFormService.postImage(formData, getImagePath);
    } else {
      alert('not valid')
    }
  }

}
