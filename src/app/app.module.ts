import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { ClothesComponent } from './clothes/clothes.component';
import { SelectInputComponent } from './select-input/select-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WardrobeComponent,
    ClothesComponent,
    HeaderComponent,
    CreateFormComponent,
    SelectInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
