import {Component, OnInit, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import {CreateFormService} from './create-form.service';

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
  isSubmitted: boolean;
  clothTypeOptions: string[];
  colorOptions: string[];
  sizeOptions: string[];
  styleOptions: string[];
  @Output() closeEvent: EventEmitter<string> = new EventEmitter<string>();
  isImageRight: boolean = false;
  private imageToSend: FormGroup = this.formBuilder.group({
    image: ['']
  });
  isSuccess = false;
  isServerError = false;



  newCardForm: FormGroup = new FormGroup({
    clothType: new FormControl('', [
      Validators.required
    ]),
    size: new FormControl('', [
      Validators.required
      ]),
    color: new FormControl('', [
      Validators.required
    ]),
    brand: new FormControl(''),
    shopLink: new FormControl(''),
    tag: new FormControl(''),
    style: new FormControl('', [
      Validators.required
    ]),
    code: new FormControl(''),
    hasPattern: new FormControl(''),
    imageName: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private createFormService: CreateFormService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.isSubmitted = false;
    this.getSelectOptions();
    this.getSelectOptions();
  }

  get clothType() {
    return this.newCardForm.get('clothType');
  }

  get color(){
    return this.newCardForm.get('color');
  }

  get style(){
    return this.newCardForm.get('style');
  }

  get size(){
    return this.newCardForm.get('size');
  }

  get imageName(){
    return this.newCardForm.get('imageName');
  }

  getSelectOptions() {
    this.createFormService.getSelectOptions().subscribe({
      next: options => {
        this.sizeOptions = options['Size'];
        this.styleOptions = options['Style'];
        this.colorOptions = options['Color'];
        this.clothTypeOptions = options['ClothType'];
      }
    });
  }

  getSelectValue(event) {
    const selectedValue = event[0];
    const inputName = event[1];
    this.newCardForm.get(inputName).setValue(selectedValue.toString().toUpperCase());
  }

  closeForm(event) {
    if (event) {
      event.preventDefault();
    }
    this.closeEvent.emit('close');
  }

  saveImage(event) {
    event.preventDefault();

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size <= 5242880){
        this.newCardForm.get('imageName').setValue('smth');
        this.imageToSend.get('image').setValue(file);
        this.isImageRight = true;
      }
    }
  }

  saveItem(event) {
    event.preventDefault();
    this.isSubmitted = true;

    const getImageName = (path) => {
      this.newCardForm.value.imageName = path.fileName;

      const getResponse = (response) => {

        if (!response?.error) {
          this.isSuccess = true;
          setTimeout(() => {
            this.closeForm('');
          }, 1200);
        } else {
          this.isServerError = true;
        }
      };

      this.createFormService.saveClothes(this.newCardForm.value, getResponse);

    };
    const formData = new FormData();
    formData.append('file', this.imageToSend.get('image').value);


    if (this.newCardForm.valid) {
      this.createFormService.postImage(formData, getImageName);
    }
  }

}
