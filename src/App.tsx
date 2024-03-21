import './App.css'
import { useEffect} from 'react'
import { cities } from './controller/data'
import { get_city, get_weather } from './controller/weather-api'
import { add_city_contract_call, update_weather_contract_call } from './controller/rpc-client';

function App() {

  function create_cities() {
    cities.forEach(city => {
      get_city(city)
      console.log(cities)
    });
  }

  function update_weather() {
    cities.forEach(city => {
      get_weather(city)
      console.log(cities)
    })
  }

  function push_data_to_oracle() {

    add_city_contract_call(cities)
  }

  function update_data_to_oracle() {
    update_weather_contract_call(cities)
    .catch(err => {
      console.log(err)
    })
  }

  // useInterval(()=> {
  //   console.log("loop")
  // }, 1000)

  return (
    <>
    <button onClick={
      ()=> {
      create_cities()
      console.log(cities)
      }
    }>
      Call cities data
    </button>

    <button onClick={()=> { 
    update_weather()
    console.log(cities)
    }}>Call weather data</button>

     <button onClick={()=> { 
     push_data_to_oracle()
    }}>Push on contract</button>

    <button onClick={()=> { 
     update_data_to_oracle()
    }}>Update contract data</button>
    </>
  )
}

export default App
