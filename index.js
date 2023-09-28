const key = '6mcT10kY92ZoSPJkUGluGFcygPfaizdX';
const cityForm=document.querySelector('form')
const details = document.querySelector('.details')
const card = document.querySelector('.card')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')
const timeStamp=document.querySelector('.utc')

const getCity = async(city)=> {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search`
    const query = `?apikey=${key}&q=${city}`
    const response = await fetch(url + query)
    const data = await response.json()
    return data[0]
}
const getWeather = async (id) => {
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${id}`
    const query = `?apikey=${key}`
    const response = await fetch(url + query)
    const data = await response.json()
    return data[0]
}

const getTime = async (location) => {
    const base = 'http://worldtimeapi.org/api/timezone/'
    const query=location
   const response= await fetch(base+location)
    const data = await response.json()
    return data ;
}
const updateCity = async(city)=> {
    const cityDet = await getCity(city)
    const weather = await getWeather(cityDet.Key)
    const utc= await getTime(cityDet.TimeZone.Name)
    return {cityDet,weather,utc}
}
const updateUI = (data) => {
    const cityDet = data.cityDet
    const weather = data.weather
    const utc = data.utc   
    const date = utc.datetime.slice(0, 10)
    const utcTime=utc.datetime.slice(11, 16)
    
    timeStamp.innerHTML = `
                      <div class="">Date: ${date}</div>
                      <div class="">Time: ${utcTime}</div>
                     `
    details.innerHTML = `
    <div class="text-center capitalize text-center details text-sm">
                     <h1 class="my-3 font-bold text-gray-700 text-sm sm:text-xl">${cityDet.EnglishName}</h1>
                     <div class="my3">${weather.WeatherText}</div>
                     
                     <div class="text-lg sm:text-2xl my-4">
                        <span>${weather.Temperature.Metric.Value}</span>
                        <span>&deg;c</span>
                     </div>
                </div>
    `
    const iconSrc = `/img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src',iconSrc)
    if (card.classList.contains('hidden')) {
        card.classList.remove('hidden')
    }
    let timeSrc=``
    if (weather.IsDayTime) {
        timeSrc='/img/day.svg'
    } else {
        timeSrc='/img/night.svg'
    }
    time.setAttribute('src', timeSrc)
    
}


cityForm.addEventListener('submit',e => {
    e.preventDefault()
    const city = cityForm.city.value.trim()
    cityForm.reset()
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => err.message)
})
