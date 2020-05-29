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

  toggleOptions(event){
    event.stopPropagation();
    console.log(event.target);
    if (this.selectLabel.nativeElement.contains(event.target)) {
      this.selectList.nativeElement.classList.toggle('show-flex');
      this.arrowDown.nativeElement.classList.toggle('rotate');
    }
  }

}
