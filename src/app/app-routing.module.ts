import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WardrobeComponent} from './wardrobe/wardrobe.component';
import { ItemDetailsComponent } from './wardrobe/item-details/item-details.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthComponent} from './auth/auth.component';


const routes: Routes = [
  { path: 'wardrobe', component: WardrobeComponent },
  { path: 'wardrobe/:id', component: ItemDetailsComponent},
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
