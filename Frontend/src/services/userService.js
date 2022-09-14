import httpService from "./httpService.js";
//import config from "../config.json";


export function registerUser(data) {
	return httpService.post(`${'/api'}/users`, data)
    	//.then( () => console.log('suscess'))
    	//.catch( (e) => console.log(e));
}


export function forgetPassword(data) {
	return httpService.post(`${'/api'}/users/resetPassword`, data)
    	//.then( () => console.log('suscess'))
    	//.catch( (e) => console.log(e));
}


export function resetPassword(data) {
	return httpService.post(`${'/api'}/users/storePassword`, data)
    	//.then( () => console.log('suscess'))
    	//.catch( (e) => console.log(e));
}

