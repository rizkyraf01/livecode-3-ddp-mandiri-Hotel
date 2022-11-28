import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Booked } from '../model/booked.model';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-booked-for',
  templateUrl: './booked-for.component.html',
  styleUrls: ['./booked-for.component.scss']
})
export class BookedForComponent implements OnInit {

  booking!:Booked
  constructor(private readonly hotelService:HotelService,private readonly route:ActivatedRoute, private readonly router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next:(params:Params)=>{
        const {id}=params;
        this.hotelService.get(+id).subscribe({
          next:(booked:Booked)=>{
            this.booking=booked
            this.setFormValue(this.booking)
          }
        })

      }
    })
  }

  onSubmit():void{
    this.hotelService.save(this.bookForm.value).subscribe();
    this.bookForm.reset();
    this.router.navigateByUrl('booked')
  }

  bookForm:FormGroup = new FormGroup({
    id: new FormControl(null),
    roomNumber: new FormControl(null,[Validators.required]),
    duration: new FormControl(null,[Validators.required]),
    count: new FormControl(null,[Validators.required]),
    status: new FormControl('reserved'),
    reserver:new FormGroup({
      name: new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required]),
    })

  })
  setFormValue(booked:Booked){
    if(booked){
      this.bookForm.controls['id']?.setValue(booked.id)
      this.bookForm.controls['reserver']?.setValue(booked.reserver)
      this.bookForm.controls['roomNumber']?.setValue(booked.roomNumber)
      this.bookForm.controls['duration']?.setValue(booked.duration)
      this.bookForm.controls['count']?.setValue(booked.count)
    }
  }
  
  isFormValid(bookField:string){
    const control:AbstractControl = this.bookForm.get(bookField) as AbstractControl;
    return control && control.invalid && (control.dirty ||control.touched)
  }
}
