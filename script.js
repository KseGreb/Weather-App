
const geoApi={
    endpoint:"https://api.ipgeolocation.io/ipgeo",
    key:"60c64a7d14414305ae7cf4230c2e8f30"
}

async function geolocation(){
    const geoRes = await fetch(`${geoApi.endpoint}?apiKey=${geoApi.key}`);
    const geoResult = await geoRes.json();
    forecast(geoResult.city);
    console.log(geoResult)
    console.log(geoResult.city, geoResult.country_name)
    console.log(geoResult.time_zone.current_time)
}
geolocation();



const api={
    endpoint:"https://api.openweathermap.org/data/2.5/",
    key: "7415ced3d3cd3f56ebd98554fb28f436"
}

const info = document.querySelector(".info");
const button = document.querySelector("#btn");

const input = document.querySelector("#input");
input.addEventListener("keyup", enter);

function enter(e){
    if(e.key === "Enter"){
        forecast(input.value);
        info.style = "display: block";
        button.style = "display: block";
    }
    
}

async function forecast(data){
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&APPID=${api.key}`);
    const result = await res.json();
    showResult(result);
    console.log(result)
}

function showResult(result){
   
    let city = document.querySelector("#city");
    city.innerHTML = `${result.name}, ${result.sys.country}`;

    getDate();
    
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = "Current: " + `${Math.round(result.main.temp)}<span>°</span>`;

    let high = document.querySelector("#high");
    high.innerHTML = "Max: " + `${Math.round(result.main.temp_max)}<span>°</span>`;

    let low = document.querySelector("#low");
    low.innerHTML = "Min: " + `${Math.round(result.main.temp_min)}<span>°</span>` +  " Max: " + `${Math.round(result.main.temp_max)}<span>°</span>`;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML ="Feels like: " +  `${Math.round(result.main.feels_like)}<span>°</span>`;

    let clouds = document.querySelector("#clouds");
    clouds.innerHTML = `${result.weather[0].description}`;

    if (clouds.innerHTML === "thunder"){
        document.body.style.backgroundImage = "url('lightning.jpg')";
    }    
    else if (clouds.innerHTML === "snow"){
        document.body.style.backgroundImage = "url('snow.jpg')";
    }
    else if (clouds.innerHTML === "clear sky"){
        document.body.style.backgroundImage = "url('sunny.jpg')";
    }  
    else if (clouds.innerHTML === "few clouds"|| "overcast clouds" || "broken clouds"){
        document.body.style.backgroundImage = "url('sun-and-clouds.jpg')";
    }
    else if (clouds.innerHTML === "mist"||"fog"|| "haze"){
        document.body.style.backgroundImage = "url('mist.jpg')";
    }
    else if (clouds.innerHTML === "scattered clouds" || "clouds"){
        document.body.style.backgroundImage = "url('scattered-clouds.jpg')";
    }
    else if (clouds.innerHTML === "light rain"||"rain"){
        document.body.style.backgroundImage = "url('rain.jpg')";
    }
    else {
        document.body.style.backgroundImage = "url('rocks.jpg')";
    }

    let sunrise = document.querySelector("#sunrise");
    let sunRise = result.sys.sunrise * 1000;
    let timeSunrise = new Date(sunRise);
    sunrise.innerHTML = "Sunrise: " + timeSunrise;

    console.log(sunrise)


    let sunset = document.querySelector("#sunset");
    let sunSet = result.sys.sunset * 1000;
    let timeSunset = new Date(sunSet);
    sunset.innerHTML = "Sunset: " +  timeSunset;
    console.log(sunset)
   

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = "Humidity: " +  `${result.main.humidity}<span>%</span>`

    let pressure = document.querySelector("#pressure");
    pressure.innerHTML = "Atmosphere pressure: " +  `${result.main.pressure}` + " hPa";
    
    let wind = document.querySelector("#wind");
    wind.innerHTML = "Wind: " + `${result.wind.speed}` + " km/h";

    button.addEventListener("click", moreInfo);

    function moreInfo(){
        const hidden = document.querySelector(".hidden");
        if (hidden.style.display === "none") {
          hidden.style.display = "block";
          btn.textContent = "LESS INFO";
        } else {
          hidden.style.display = "none";
          btn.textContent = "MORE INFO";
        }
      }
        //hidden.style = "display: block";
    


    function getDate(){
        const today = new Date();
        let date = document.querySelector("#date");
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];    
        let weekDay = days[today.getDay()];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = months[today.getMonth()];
        let day = today.getDate();
        let year = today.getFullYear();
        date.innerHTML =weekDay + " " + month + " " + day + " " + year;
    }
}


