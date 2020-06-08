import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';

import { SelectInputComponent } from './select-input/select-input.component';
import { CreateFormComponent } from './create-form/create-form.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ItemSliderComponent } from './item-slider/item-slider.component';
import {ItemDetailsComponent} from "./wardrobe/item-details/item-details.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { ImagePreloadDirective } from './image-preload.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WardrobeComponent,
    HeaderComponent,
    CreateFormComponent,
    SelectInputComponent,
    ItemSliderComponent,
    ItemDetailsComponent,
    ImagePreloadDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    InfiniteScrollModule
  ],
  providers: [],
  exports: [
    SelectInputComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
