import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDiplayComponent } from './user-diplay/user-diplay.component';


const routes: Routes = [
  { path: '', component: UserDiplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
