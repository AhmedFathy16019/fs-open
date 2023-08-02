import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (lat, lon) => {
    console.log('apiKey :>> ', apiKey);
    const requestUrl = `${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    console.log('requestUrl :>> ', requestUrl); 
    return axios
        .get(requestUrl)
        .then(response => {
            return response.data
        })
}

export default getWeather