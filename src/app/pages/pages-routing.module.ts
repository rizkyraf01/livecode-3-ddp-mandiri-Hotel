import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes:Routes = [
    {
        path:'booked',
        loadChildren:()=>
        import('./booked/booked.module').then((m)=>m.BookedModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PagesRoutingModule { }