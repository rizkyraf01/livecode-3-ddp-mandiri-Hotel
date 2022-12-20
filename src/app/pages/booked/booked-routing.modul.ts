import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookedForComponent } from "./booked-for/booked-for.component";
import { BookedListComponent } from "./booked-list/booked-list.component";
import { BookedComponent } from "./booked.component";

const routes: Routes = [
    {
      path: '',
      component: BookedListComponent
    },
    {
      path:'form',
      component:BookedForComponent
    },
    {
      path:"form/:id",
      component:BookedForComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BookedRoutingModule { }