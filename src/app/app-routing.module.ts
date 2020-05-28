import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WardrobeComponent} from "./wardrobe/wardrobe.component";


const routes: Routes = [
  { path: 'wardrobe', component: WardrobeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
