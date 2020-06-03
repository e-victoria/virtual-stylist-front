import { NgModule } from '@angular/core';
import { ItemDetailsComponent } from './item-details.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ItemDetailsComponent],
  imports: [
    FontAwesomeModule
  ],
  providers: [],
  exports: [
    ItemDetailsComponent
  ],
  bootstrap: []
})
export class WardrobeModule { }
