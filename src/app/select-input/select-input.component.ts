import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit {

  @ViewChild('selectWrapper')
  private selectWrapper: ElementRef;
  @ViewChild('selectList')
  private selectList: ElementRef;
  @ViewChild('arrowDown')
  private arrowDown: ElementRef;
  @ViewChild('selectLabel')
  private selectLabel: ElementRef;
  @ViewChild('selectOption')
  private selectOption: ElementRef;
  faSortDown = faSortDown;
  @Input()
  inputName: string;
  @Input()
  options: string[];
  @Input()
  inputId: string;
  @Input()
  labelClass: string;
  @Output()
  selectedValue: EventEmitter<[string, HTMLElement]> = new EventEmitter<[string, HTMLElement]>();

  constructor() { }

  ngOnInit(): void {}

  toggleOptions(event){
    event.stopPropagation();
    if (this.selectLabel.nativeElement.contains(event.target)) {
      this.selectList.nativeElement.classList.toggle('show-flex');
      this.arrowDown.nativeElement.classList.toggle('rotate');
    }

    const closeOptions = (e) => {
      if (!this.selectWrapper.nativeElement.contains(e.target)) {
        this.selectList.nativeElement.classList.remove('show-flex');
        this.arrowDown.nativeElement.classList.remove('rotate');
        document.removeEventListener('click', closeOptions);
      }
    };

    document.addEventListener('click', closeOptions);
  }

  getSelectedValue(event) {
    event.stopPropagation();
    this.selectLabel.nativeElement.textContent = event.target.textContent;
    this.selectedValue.emit([event.target.textContent, event.target.dataset.name]);
    this.selectList.nativeElement.classList.remove('show-flex');
    this.arrowDown.nativeElement.classList.remove('rotate');
  }

}
