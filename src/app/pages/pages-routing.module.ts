import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteGuard } from "../shared/guard/route.guard";
import { NotFoundComponent } from "../shared/not-found/not-found.component";
import { PagesComponent } from "./pages.component";

const routes:Routes = [
    {
        path:'',
        component:PagesComponent,
        canActivateChild:[RouteGuard],
        children:[
            {
                path:'dashboard',
                loadChildren:()=>import('./dashboard/dashboard.module').then((m)=>m.DashboardModule)
            },
            {
                path:'booked',
                loadChildren:()=>
                import('./booked/booked.module').then((m)=>m.BookedModule)
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PagesRoutingModule { }