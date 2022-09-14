import httpService from "./httpService.js";
//import config from "../config.json";


export function getBookings() {
    return httpService.get(`${'/api'}/bookings`);
}

export function getBooking(id) {
    return httpService.get(`${'/api'}/bookings/${id}`);
}

export function saveBooking(data) {
    return httpService.post(`${'/api'}/bookings`, data)
    //.then( () => console.log('success'))
    //.catch( e => console.log(e));
}

export function updateBooking(data, id) {
    return httpService.put(`${'/api'}/bookings/${id}`, data);
}

export function deleteBooking(id) {
    return httpService.delete(`${'/api'}/bookings/${id}`);
}