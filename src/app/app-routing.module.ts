import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const route:Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m=>m.PagesModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule]
})
export class AppRoutingModule{}