import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../components/home/home.component";
import {AuthComponent} from "../components/auth/auth.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
