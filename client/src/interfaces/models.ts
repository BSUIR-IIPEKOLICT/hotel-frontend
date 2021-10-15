export interface User {
    id: string,
    email: string,
    role: string
}

export interface Basket {
    _id: string,
    _user: string,
    _orders: string[]
}

export interface Building {
    _id: string,
    address: string,
    _rooms: string[]
}

export interface Room {
    _id: string,
    _building: string,
    _type: string,
    _order: string,
    isFree: boolean,
    population: number
}

export interface Order {
    _id: string,
    _basket: string,
    _room: string,
    _services: string[],
    date: string
}

export interface Service {
    _id: string,
    name: string,
    price: number
}

export interface Type {
    _id: string,
    _services: string[],
    name: string,
    places: number
}
