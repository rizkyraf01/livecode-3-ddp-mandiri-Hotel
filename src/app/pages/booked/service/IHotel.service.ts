import { Observable } from "rxjs";
import { Booked } from "../model/booked.model";

export interface IHotelService{
    list():Observable<Booked[]>
    save(booked:Booked):Observable<Booked>
    delete(booked:Booked):Observable<Booked>
    changeCheckin(booked:Booked):Observable<Booked>
}