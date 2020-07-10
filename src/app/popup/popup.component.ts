import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  @Input()
  messageText: string;
  @Output()
  canClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  close() {
    this.canClose.emit(true);
  }

}
