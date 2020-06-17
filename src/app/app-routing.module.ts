import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WardrobeComponent} from './wardrobe/wardrobe.component';
import { ItemDetailsComponent } from './wardrobe/item-details/item-details.component';
import {AuthComponent} from './auth/auth.component';
import {UserGuard} from "./user.guard";
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  { path: 'wardrobe', component: WardrobeComponent, canActivate: [UserGuard] },
  { path: 'wardrobe/:id', component: ItemDetailsComponent, canActivate: [UserGuard]},
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
