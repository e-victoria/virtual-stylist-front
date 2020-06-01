import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';

import { SelectInputComponent } from './select-input/select-input.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { WardrobeModule } from './wardrobe/wardrobe.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WardrobeComponent,
    HeaderComponent,
    CreateFormComponent,
    SelectInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    WardrobeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
