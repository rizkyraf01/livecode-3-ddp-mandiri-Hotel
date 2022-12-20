import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NIGHTLY_FEE } from 'src/app/shared/utils/nightly-fee.utils';
import { Booked } from '../model/booked.model';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-booked-for',
  templateUrl: './booked-for.component.html',
  styleUrls: ['./booked-for.component.scss']
})
export class BookedForComponent implements OnInit {
  nigthFee:number= NIGHTLY_FEE
  booking!:Booked
  constructor(private readonly hotelService:HotelService,
    private readonly route:ActivatedRoute, 
    private readonly router:Router) { }
      //only number will be add
  
    keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

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
    const payload =this.bookForm.value;
    const {reserver,roomNumber,duration}=payload
    const totalPrice =duration*NIGHTLY_FEE
    this.hotelService.save(payload).subscribe({
      next:()=>{
        alert(
          `Tamu ${reserver.name} telah melakukan pemesanan untuk kamar ${roomNumber} selama ${duration} malam dengan total tagihan sebesar ${totalPrice}.`
        );
      }
    })
    this.bookForm.reset();
    this.router.navigateByUrl('hotel/booked')
  }

  bookForm:FormGroup = new FormGroup({
    id: new FormControl(null),
    roomNumber: new FormControl(null, [Validators.required,Validators.minLength(1)]),
    duration: new FormControl(null, [Validators.required,Validators.minLength(1)]),
    count: new FormControl(null, [Validators.required,Validators.minLength(1)]),
    status: new FormControl('reserved'),
    reserver:new FormGroup({
      id:new FormControl(null),
      name: new FormControl(null, [Validators.required,Validators.minLength(2)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      phone:new FormControl(null, [Validators.required,Validators.minLength(12),Validators.pattern("^[0-9]*$")]),
    })
  })
  setFormValue(booked:Booked){
    if(booked){
      const {id,reserver,count,duration,roomNumber}=booked
      this.bookForm.get('id')?.setValue(id)
      this.bookForm.get(['reserver', 'name'])?.setValue(reserver.name);
      this.bookForm.get(['reserver', 'email'])?.setValue(reserver.email);
      this.bookForm.get(['reserver', 'phone'])?.setValue(reserver.phone);
      this.bookForm.get(['count'])?.setValue(count);
      this.bookForm.get(['roomNumber'])?.setValue(roomNumber);
      this.bookForm.get(['duration'])?.setValue(duration);
    }
  }
  
  isFormValid(bookField:string){
    const control:AbstractControl = this.bookForm.get(bookField) as AbstractControl;
    return control && control.invalid && (control.dirty ||control.touched)
  }
}
