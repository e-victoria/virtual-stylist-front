import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WardrobeComponent} from './wardrobe/wardrobe.component';
import { ItemDetailsComponent } from './wardrobe/item-details/item-details.component';
import {AuthComponent} from './auth/auth.component';
import {UserGuard} from './user.guard';
import {ProfileComponent} from './profile/profile.component';
import {StylisationsComponent} from './stylisations/stylisations.component';
import {StylisationCreatorComponent} from './stylisations/stylisation-creator/stylisation-creator.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UserGuard]},
  { path: 'wardrobe', component: WardrobeComponent, canActivate: [UserGuard] },
  { path: 'wardrobe/:id', component: ItemDetailsComponent, canActivate: [UserGuard]},
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [UserGuard]},
  { path: 'stylisations', component: StylisationsComponent, canActivate: [UserGuard] },
  { path: 'create-stylisation', component: StylisationCreatorComponent, canActivate: [UserGuard] },
  { path: 'create-stylisation/:id', component: StylisationCreatorComponent, canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
