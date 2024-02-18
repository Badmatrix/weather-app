import * as images from 'url:/static/img/*.svg'
import * as icons from 'url:/static/img/*.png'
class App {
  #weatherapiKey = '33549919c0d24d7bae4220234241402'
  #parentEl = document.querySelector('.wrapper')
  #sideGrid = this.#parentEl.querySelector('.side-container')
  #bodyContainer = this.#parentEl.querySelector('.body-content--box')
  #dateContainer= this.#parentEl.querySelector('.date-box')
  #form= this.#parentEl.querySelector('form.search-city')
  constructor() {
    this._getUserPosition()
    this.#form.addEventListener('submit',this._getSearchCity.bind(this))
  }
  _getUserPosition () {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(this._loadPosition.bind(this),
        function (err = 'error getting location') {
        alert(err.message)
    })
  }
  _loadPosition (position) {
    const {latitude,longitude} = position.coords
    // console.log(position)
    this._getWeatherData(latitude,longitude)
  }
  _urlTimeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request taking too long! check internet connection and try again`));
    }, s * 1000);
  });
  };

 async _getJson(url) { 
   try {
     const res = await Promise.race([fetch(url), this._urlTimeout(10)]);
      if (!res.ok) throw Error(`${res.status} could not fetch data`)
      const data = await res.json()
      if(!data) return
      return data
   }
   catch (err) {
     this._renderError(err)
   }
  }
  async _getWeatherData(lat, lng) {
    this._renderSpiner()
    try {
      const data = await this._getJson(`http://api.weatherapi.com/v1/current.json?key=${this.#weatherapiKey}&q=${lat},${lng}`)
      if(!data) throw Error(`Error loading page! try again`)
      const { current, location } = data
      // console.log(data)
      this._renderSideHtml(current, location)
      this._getSearchcityTime(location.tz_id)
        this._renderweatherHtml(current)
        return data
    } catch (err) {
      this._renderError(err)
    } 
  }

 async _getSearchCity(e) {
    e.preventDefault()
    this._renderSpiner()
    const cityName = this.#form.city.value.toLowerCase()
    try {
      const data=await this._getJson(`https://api.weatherapi.com/v1/current.json?key=${this.#weatherapiKey}&q=${cityName}`)
      if(!data) throw Error (`${cityName} does not exist check spelling`)
      const { current, location } = data
      // console.log(data)
      this._getSearchcityTime(location.tz_id)
      this._renderSideHtml(current, location)
      this._renderweatherHtml(current)
      this.#form.reset()
    } catch(err) {
      this._renderError(err)
    } 
   
}
  async _getSearchcityTime (location){
    const data=await this._getJson(`https://worldtimeapi.org/api/timezone/${location}`)
    // console.log(data)
    this._renderDate(data)
    return data ;
  }
 
  _renderDate(data) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = `${daysOfWeek[data.day_of_week]}, ${data.datetime.slice(11, 16)}`

    const render =`
              <div class="date">
                    <h1>${date}</h1>
                </div>`
    this.#dateContainer.innerHTML = ''
    this.#dateContainer.insertAdjacentHTML('afterbegin',render)
    
  }
  _renderError(error) {
    const render = `
    <div class="error">
      <div>
       <img src="${icons.error}" alt="error icon">
      </div>
      <h1>${error.message}</h1>
    </div>`

     this.#bodyContainer.innerHTML = ''
    this.#bodyContainer.insertAdjacentHTML('afterbegin',render)
  }
    _renderSpiner() {
    const render =`
      <div class="flex justify-center items-center align-middle" role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>`
    this.#bodyContainer.innerHTML = ''
    this.#bodyContainer.insertAdjacentHTML('afterbegin',render)
  }
   _renderSideHtml(weather,location) {
    this.#sideGrid.innerHTML = ''
    // console.log(weather)
   const timeOfDay= weather.is_day?images.day:images.night
    const render =`
        <div class="content">
                <h1>${location.name}, ${location.country}</h1>
                <h4>${weather.condition.text}</h4> 
                <div class="weather-img">
                    <img src="${timeOfDay}" alt="weather icon" class="image1">
                    <img src="${weather.condition.icon}" alt="weather icon" class="image2">
                </div>
                <h2>${Math.round(weather.temp_c)}&degC</h2>
                <h3>Feels like ${Math.round(weather.feelslike_c)}&degC</h3>
            </div>`
    
    
    this.#sideGrid.insertAdjacentHTML('afterbegin',render)
  }
  _renderweatherHtml(weather) {
    const render =`
      <div class="body-content"> 
                <div class="container--small">
                    <div class="container--img">
                        <img src="${icons.humidity}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>humidity </p>
                        <h2>${weather.humidity }<span> %</span></h2>
                    </div>
                </div>
               
                <div class="container--small">
                    <div class="container--img">
                        <img src="${icons.vision}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>visibility </p>
                        <h2>${weather.vis_km }<span> km</span></h2>
                    </div>
                </div>
                <div class="container--small">
                    <div class="container--img">
                        <img src="${icons.moisture}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>precipitation</p>
                        <h2>${weather.precip_mm }<span> mm</span></h2>
                    </div>
                </div>
                 <div class="container--small">
                    <div class="container--img">
                        <img src="${icons.ecology}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>wind speed </p>
                        <h2>${weather.wind_kph }<span> km/h</span></h2>
                    </div>
                </div>
                <div class="container--small">
                    <div class="container--img">
                        <img src="${icons.compass}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>wind direction </p>
                        <h2>${weather.wind_dir}<span> </span></h2>
                    </div>
                </div>
                <div class="container--small">
                    <div class="container--img">
                        <img src="${icons.wind_gust}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>wind gust </p>
                        <h2>${weather.gust_kph}<span> km/h</span></h2>
                    </div>
                </div>
          </div>`
    this.#bodyContainer.innerHTML = ''
    this.#bodyContainer.insertAdjacentHTML('afterbegin',render)
  }

}
const app = new App

