import { Component, OnInit } from '@angular/core';
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
        this.booking=booked
      }
    })
  }
  onCheckOut(booked:Booked):void{
    this.hotelService.changeCheckout(booked).subscribe({
      next:(booked:Booked)=>{
        this.booking=booked
      }
    })
  }

}
