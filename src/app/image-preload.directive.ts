import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)':'updateUrl()',
    '(load)': 'load()',
    '[src]':'src'
  }
})
export class ImagePreloadDirective {

  @Input() src:string;
  @Input() default:string;
  @HostBinding('class') className;

  constructor() { }

  updateUrl() {
    this.src = this.default;
  }
  load(){
    this.className = 'image-loaded';
  }

}
