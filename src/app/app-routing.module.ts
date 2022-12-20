import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteGuard } from "./shared/guard/route.guard";
import { NotFoundComponent } from "./shared/not-found/not-found.component";

const route:Routes = [
    {
        path:'auth',
        loadChildren:()=>import('./auth/auth.module').then((m)=>m.AuthModule)
    },
    {
        path: 'hotel',
        canActivateChild:[RouteGuard],
        loadChildren: () => import('./pages/pages.module').then((m)=>m.PagesModule)
    },
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule]
})
export class AppRoutingModule{}