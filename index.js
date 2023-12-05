const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json';
const KEY = '557cff91c3e64c23afa215730230412';

function forecastApi(city = 'rivne', days=7) {
    fetch(`${BASE_URL}?key=${KEY}&q=${city}&days=${days}`).then(response => { 
        if (!response.ok) {
           throw new Error(response.statusText)
        }
      return  response.json()
    }).then(data=>console.log(data)).catch(error=>console.error(error))
}
forecastApi()