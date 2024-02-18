var e=globalThis,t={},i={},r=e.parcelRequirebbde;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in i){var r=i[e];delete i[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){i[e]=t},e.parcelRequirebbde=r),(0,r.register)("27Lyk",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>i,set:e=>i=e,enumerable:!0,configurable:!0});var i,r=new Map;i=function(e,t){for(var i=0;i<t.length-1;i+=2)r.set(t[i],{baseUrl:e,path:t[i+1]})}}),r("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["9vqfN","index.a0f0d37c.js","xItFs","day.a01fd25d.svg","2nY3k","night.04568320.svg","5geyD","reshot-icon-weather-RDVC82WGXP.65a1ad5d.svg","fnmVG","compass.7434c82d.png","9J7GD","ecology.9cd2b4d7.png","izBlT","error.5a9c4631.png","2QEoG","humidity.889cf010.png","3xzG8","moisture.fda6215d.png","jY9ee","vision.683dc21a.png","4Ohrv","wind_gust.9677ed64.png"]'));var n={},a={};a=new URL("day.a01fd25d.svg",import.meta.url).toString();var s={};s=new URL("night.04568320.svg",import.meta.url).toString();n={day:a,night:s,"reshot-icon-weather-RDVC82WGXP":new URL("reshot-icon-weather-RDVC82WGXP.65a1ad5d.svg",import.meta.url).toString()};var o={},d={};d=new URL("compass.7434c82d.png",import.meta.url).toString();var c={};c=new URL("ecology.9cd2b4d7.png",import.meta.url).toString();var l={};l=new URL("error.5a9c4631.png",import.meta.url).toString();var h={};h=new URL("humidity.889cf010.png",import.meta.url).toString();var g={};g=new URL("moisture.fda6215d.png",import.meta.url).toString();var m={};m=new URL("vision.683dc21a.png",import.meta.url).toString();o={compass:d,ecology:c,error:l,humidity:h,moisture:g,vision:m,wind_gust:new URL("wind_gust.9677ed64.png",import.meta.url).toString()};class p{#e="33549919c0d24d7bae4220234241402";#t=document.querySelector(".wrapper");#i=this.#t.querySelector(".side-container");#r=this.#t.querySelector(".body-content--box");#n=this.#t.querySelector(".date-box");#a=this.#t.querySelector("form.search-city");constructor(){this._getUserPosition(),this.#a.addEventListener("submit",this._getSearchCity.bind(this))}_getUserPosition(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(this._loadPosition.bind(this),function(e="error getting location"){alert(e.message)})}_loadPosition(e){let{latitude:t,longitude:i}=e.coords;this._getWeatherData(t,i)}_urlTimeout(e){return new Promise(function(t,i){setTimeout(function(){i(Error("Request taking too long! check internet connection and try again"))},1e3*e)})}async _getJson(e){try{let t=await Promise.race([fetch(e),this._urlTimeout(10)]);if(!t.ok)throw Error(`${t.status} could not fetch data`);let i=await t.json();if(!i)return;return i}catch(e){this._renderError(e)}}async _getWeatherData(e,t){this._renderSpiner();try{let i=await this._getJson(`http://api.weatherapi.com/v1/current.json?key=${this.#e}&q=${e},${t}`);if(!i)throw Error("Error loading page! try again");let{current:r,location:n}=i;return this._renderSideHtml(r,n),this._getSearchcityTime(n.tz_id),this._renderweatherHtml(r),i}catch(e){this._renderError(e)}}async _getSearchCity(e){e.preventDefault(),this._renderSpiner();let t=this.#a.city.value.toLowerCase();try{let e=await this._getJson(`http://api.weatherapi.com/v1/current.json?key=${this.#e}&q=${t}`);if(!e)throw Error(`${t} does not exist check spelling`);let{current:i,location:r}=e;this._getSearchcityTime(r.tz_id),this._renderSideHtml(i,r),this._renderweatherHtml(i),this.#a.reset()}catch(e){this._renderError(e)}}async _getSearchcityTime(e){let t=await this._getJson(`https://worldtimeapi.org/api/timezone/${e}`);return this._renderDate(t),t}_renderDate(e){let t=`${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e.day_of_week]}, ${e.datetime.slice(11,16)}`,i=`
              <div class="date">
                    <h1>${t}</h1>
                </div>`;this.#n.innerHTML="",this.#n.insertAdjacentHTML("afterbegin",i)}_renderError(e){let t=`
    <div class="error">
      <div>
       <img src="${o.error}" alt="error icon">
      </div>
      <h1>${e.message}</h1>
    </div>`;this.#r.innerHTML="",this.#r.insertAdjacentHTML("afterbegin",t)}_renderSpiner(){let e=`
      <div class="flex justify-center items-center align-middle" role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>`;this.#r.innerHTML="",this.#r.insertAdjacentHTML("afterbegin",e)}_renderSideHtml(e,t){this.#i.innerHTML="";let i=e.is_day?n.day:n.night,r=`
        <div class="content">
                <h1>${t.name}, ${t.country}</h1>
                <h4>${e.condition.text}</h4> 
                <div class="weather-img">
                    <img src="${i}" alt="weather icon" class="image1">
                    <img src="${e.condition.icon}" alt="weather icon" class="image2">
                </div>
                <h2>${Math.round(e.temp_c)}&degC</h2>
                <h3>Feels like ${Math.round(e.feelslike_c)}&degC</h3>
            </div>`;this.#i.insertAdjacentHTML("afterbegin",r)}_renderweatherHtml(e){let t=`
      <div class="body-content"> 
                <div class="container--small">
                    <div class="container--img">
                        <img src="${o.humidity}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>humidity </p>
                        <h2>${e.humidity}<span> %</span></h2>
                    </div>
                </div>
               
                <div class="container--small">
                    <div class="container--img">
                        <img src="${o.vision}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>visibility </p>
                        <h2>${e.vis_km}<span> km</span></h2>
                    </div>
                </div>
                <div class="container--small">
                    <div class="container--img">
                        <img src="${o.moisture}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>precipitation</p>
                        <h2>${e.precip_mm}<span> mm</span></h2>
                    </div>
                </div>
                 <div class="container--small">
                    <div class="container--img">
                        <img src="${o.ecology}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>wind speed </p>
                        <h2>${e.wind_kph}<span> km/h</span></h2>
                    </div>
                </div>
                <div class="container--small">
                    <div class="container--img">
                        <img src="${o.compass}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>wind direction </p>
                        <h2>${e.wind_dir}<span> </span></h2>
                    </div>
                </div>
                <div class="container--small">
                    <div class="container--img">
                        <img src="${o.wind_gust}" alt="weather icon">
                    </div>
                    <div class="info">
                        <p>wind gust </p>
                        <h2>${e.gust_kph}<span> km/h</span></h2>
                    </div>
                </div>
          </div>`;this.#r.innerHTML="",this.#r.insertAdjacentHTML("afterbegin",t)}}new p;
//# sourceMappingURL=index.a0f0d37c.js.map
