import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit {

  @ViewChild('selectList')
  private selectList: ElementRef;
  @ViewChild('arrowDown')
  private arrowDown: ElementRef;
  @ViewChild('selectLabel')
  private selectLabel: ElementRef;
  faSortDown = faSortDown;
  @Input()
  inputName: string;
  @Input()
  options: string[];

  constructor() { }

  ngOnInit(): void {
  }

  toggleOptions(event){
    event.stopPropagation();
    if (this.selectLabel.nativeElement.contains(event.target)) {
      this.selectList.nativeElement.classList.toggle('show-flex');
      this.arrowDown.nativeElement.classList.toggle('rotate');
    }
  }

}
