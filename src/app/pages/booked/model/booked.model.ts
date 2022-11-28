export interface Booked{
    id:number,
    status:"reserved"|"check-in"|"check-out"
    roomNumber:number,
    duration:number,
    count:number,
    reserver:Guest

}
export interface Guest{
    idGuesst:number,
    name:string,
    email:string,
    phone:string
}