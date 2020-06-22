import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { ProfileComponent } from './profile/profile.component';

import { SelectInputComponent } from './select-input/select-input.component';
import { CreateFormComponent } from './create-form/create-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ItemSliderComponent } from './item-slider/item-slider.component';
import {ItemDetailsComponent} from './wardrobe/item-details/item-details.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { ImagePreloadDirective } from './image-preload.directive';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './user/user.component';
import {TokenInterceptor} from './token.interceptor';
import { StylisationsComponent } from './stylisations/stylisations.component';
import { ImgSecurePipe } from './img-secure.pipe';
import { StylisationCreatorComponent } from './stylisations/stylisation-creator/stylisation-creator.component';
import { StylisationItemComponent } from './stylisations/stylisation-item/stylisation-item.component';
import {FeaturedStylizationsComponent} from './featured-stylizations/featured-stylizations.component';

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
    ImagePreloadDirective,
    RegisterComponent,
    AuthComponent,
    LoginComponent,
    UserComponent,
    ProfileComponent,
    FeaturedStylizationsComponent
    ProfileComponent,
    StylisationsComponent,
    ImgSecurePipe,
    StylisationCreatorComponent,
    StylisationItemComponent
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [
    SelectInputComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
