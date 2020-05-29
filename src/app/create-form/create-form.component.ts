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
  faSortDown = faSortDown;
  private image: Blob;
  category: string;
  options: string[];
  category2: string;
  options2: string[];

  constructor() { }

  ngOnInit(): void {
    this.category = 'category';
    this.options = ['dress', 'jeans']
    this.category2 = 'category2';
    this.options2 = ['dress2', 'jeans2']
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

  toggleOptions(event){
    event.stopPropagation();
    if (this.selectLabel.nativeElement.contains(event.target)) {
      this.selectList.nativeElement.classList.toggle('show-flex');
      this.arrowDown.nativeElement.classList.toggle('rotate');
    }
  }

}
