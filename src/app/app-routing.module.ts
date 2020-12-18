import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DataResolver } from './data.resolver';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  
  {path:"register",component:RegisterComponent},
  {path:"admin",component:AdminComponent,resolve:{data:DataResolver}},
  {path:"edit/:id",component:EditComponent},
  {path:"",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
