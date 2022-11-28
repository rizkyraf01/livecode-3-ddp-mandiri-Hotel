import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Booked } from '../model/booked.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private bookings:Booked[]=[];
  private storage:Storage=sessionStorage;
  constructor() { }
  list():Observable<Booked[]>{
    return new Observable<Booked[]>((obs:Observer<Booked[]>)=>{
      const sessionStorage:string=this.storage.getItem('bookings') as string
      try{
        const bookings:Booked[]=sessionStorage?JSON.parse(sessionStorage):[  ]
        this.bookings=bookings;
        this.setToStorage()
        obs.next(this.bookings);
      }catch(err:any){
        obs.error(err.message)
      }
    })
  }
  save(booked:Booked):Observable<void>{
    return new Observable<void>((obs:Observer<void>)=>{
      try{
        if(booked.id){
          this.bookings = this.bookings.map((t) => {
            if (t.id === booked.id) t = booked;
            return t;
          });
        }else{
          booked.id=this.bookings.length+1;
          this.bookings.push(booked);
          obs.next();
        }
        this.setToStorage();
      }catch(err:any){
        obs.error(err.message);
      }
    })
  }
  delete(booked:Booked):Observable<Booked>{
    return new Observable<Booked>((obs:Observer<Booked>)=>{
      try{
        for(let index=0;index<this.bookings.length;index++){
          if(this.bookings[index].id===booked.id){
            this.bookings.splice(index,1);
          }          
        }
        obs.next(booked);
        this.setToStorage();
      }catch(err:any){
        obs.error(err.message)
      }
    })
  }
  changeCheckin(booked:Booked):Observable<Booked>{
    return new Observable<Booked>((obs:Observer<Booked>)=>{
      try{
         booked.status="check-in";
         obs.next(booked);
         this.setToStorage();
      }catch(err:any){
        obs.error(err.message);
      }
    })
  }
  changeCheckout(booked:Booked):Observable<Booked>{
    return new Observable<Booked>((obs:Observer<Booked>)=>{
      try{
         booked.status="check-out";
         obs.next(booked);
         this.setToStorage();
      }catch(err:any){
        obs.error(err.message);
      }
    })
  }
  get(id:number):Observable<Booked>{
    return new Observable<Booked>((observer:Observer<Booked>)=>{
      try{
        const ids=this.bookings.find((t)=>t.id === id)as Booked  
        observer.next(ids)    
      }catch(err:any){
        observer.error(err.message)
      }
    })
  }

  private setToStorage():void{
    this.storage.setItem('bookings',JSON.stringify(this.bookings))
  }

}
