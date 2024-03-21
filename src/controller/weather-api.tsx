
import axios from 'axios';
import { add_city_contract_call } from './rpc-client';
export const get_city = (city: {id: number, name: string, lon: number, lat: number, country: string})=> {
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city.name}&limit=1&appid=140654694180271ef8be6e6a87799a22`)
        .then(response => {
            let data = response.data
            city.lat = Number(parseInt(data[0].lat) >0? parseInt(data[0].lat):-parseInt(data[0].lat)) 
            city.lon = Number(parseInt(data[0].lon) >0? parseInt(data[0].lon):-parseInt(data[0].lon))
            city.country = data[0].country||"undefined"
        })
        .catch(error => {
        console.error('There was an error!', error);
        });
}

export const get_weather = (city: {
    id: number, 
    name: string, 
    lon: number, 
    lat: number, 
    country: string, 
    windSpeed: number, 
    temp: number, 
    humidity: number, 
    visibility: number
    cloud: number
}) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=140654694180271ef8be6e6a87799a22`)
        .then(response => {
            let data = response.data
            city.windSpeed =  Math.floor(data.wind.speed * 10),
            city.temp = Number(parseInt(data.main?.temp) >0? parseInt(data.main?.temp):0),
            city.humidity = Number(parseInt(data.main?.humidity) >0? parseInt(data.main?.humidity):0),
            city.cloud = Number(parseInt(data.clouds?.all) >0? parseInt(data.clouds?.all):0),
            city.visibility = Number(parseInt(data.visibility) >0? parseInt(data.visibility):0)
        })
        .catch(error => {
        console.error('There was an error!', error);
        });
}

