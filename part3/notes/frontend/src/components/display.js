import {useState, useEffect} from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'


const Display = ({countries, handleShow}) => {
    if(countries.length === 0){
        return null;
    }
    if(countries.length > 1){
        return(
            countries
                .map((country, index) => {
                    return( 
                        <>
                            <p key={index}> {country.name.common} </p>
                            <button key={index} onClick={(event) => handleShow(event, country)}>show</button>
                        </>
                    )
                })
        )
    } else{
        return(
            <Country country={countries[0]} />
        )
    }
}

const Country = ({country}) => {
    const languages = Object.values(country.languages)
    const [weather, setWeather] = useState({})
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    useEffect(()=>{
        const requestUrl = `${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        axios
            .get(requestUrl)
            .then(response =>{
                console.log('response :>> ', response.data);
                setWeather(response.data)
            })
    }, [lat,lon])

    if(weather.weather){
        const weatherIconSrc = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        return(
            <>
                <h2>{country.name.common}</h2>
                <p>capital {country.capital[0]}</p>
                <p>area {country.area}</p>
                <h3>languages</h3>
                <ul>
                    {
                        languages.map((language, index) => <li key={index}> {language} </li>)
                    }
                </ul>
                <img src={country.flags.svg} alt={`${country.name.common}'s flag`}/>
                <h2>Weather in {country.capital[0]}</h2>
                <p>temperature {weather.main.temp}</p>
                <img src={weatherIconSrc} alt="current weather icon"></img>
                <p>wind {weather.wind.speed}</p>
            </>
        )
    } else return null
}

const Countries = {Display, Country} 

export default Countries