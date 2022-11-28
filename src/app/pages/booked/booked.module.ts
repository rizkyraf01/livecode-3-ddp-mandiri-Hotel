import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookedForComponent } from './booked-for/booked-for.component';
import { BookedComponent } from './booked.component';
import { BookedListComponent } from './booked-list/booked-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookedRoutingModule } from './booked-routing.modul';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BookedForComponent,
    BookedComponent,
    BookedListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BookedRoutingModule
  ]
})
export class BookedModule { }
