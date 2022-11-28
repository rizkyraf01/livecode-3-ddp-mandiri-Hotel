import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookedComponent } from "./booked.component";

const routes: Routes = [
    {
      path: '',
      component: BookedComponent
    },
    {
      path:":id",
      component:BookedComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BookedRoutingModule { }