import { Component, OnInit } from '@angular/core';
import { NIGHTLY_FEE } from 'src/app/shared/utils/nightly-fee.utils';
import { Booked } from '../model/booked.model';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-booked-list',
  templateUrl: './booked-list.component.html',
  styleUrls: ['./booked-list.component.scss']
})
export class BookedListComponent implements OnInit {
  bookings:Booked[]=[]
  booking!:Booked
  nigthFee:number=NIGHTLY_FEE
  constructor(private readonly hotelService:HotelService) { }

  ngOnInit(): void {
    this.onLoadHotel()
  }
  onLoadHotel():void {
    this.hotelService.list().subscribe({
      next:(bookings:Booked[])=>{
        this.bookings=bookings;
      }
    })
  }
  onDeleteHotel(booking:Booked):void{
    this.hotelService.delete(booking).subscribe({
      next:(booked:Booked)=>{
        this.booking=booked
      }
    });
  }
  onCheckIn(booked:Booked):void{
    this.hotelService.changeCheckin(booked).subscribe({
      next:(booked:Booked)=>{
        if(booked.status === 'check-out'){
          alert(
            `Tamu ${booked.reserver.name} sudah ${booked.status} tidak bisa melakukan checked-in`
          );
        }else{
          this.booking=booked
          alert(`Tamu ${booked.reserver.name} Check In ${booked.roomNumber}`);
        }
      }
    })
  }
  onCheckOut(booked:Booked):void{
    this.hotelService.changeCheckout(booked).subscribe({
      next:(booked:Booked)=>{
        if(booked.status === 'reserved'){
          alert(
            `Tamu ${booked.reserver.name} belum melakukan checked-in pada kamar ${booked.roomNumber}.`
          );
        }else{
          this.booking=booked
          alert(`Tamu ${booked.reserver.name} Check Out ${booked.roomNumber}`);
        }
      }
    })
  }

}
