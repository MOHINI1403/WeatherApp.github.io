const timeEl=document.getElementById("time");
const dateEl=document.getElementById("date");
const currentWeatherItemsEl=document.getElementById("current-weather-items");
const timeZone=document.getElementById("time-zone");
const countryEl=document.getElementById("country");
const weatherForecastel=document.getElementById("weather-forecast");
//const currentTempEl=document.getElementById("temp");
const weatherIcon=document.querySelector('.weather-icon');
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

const API_KEY='104a3496b76a2764b324f241805c401c';


setInterval(()=>{
    const time=new Date();//This would be an object which contains multiple details of the current Date 
    const month=time.getMonth();
    const date=time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const minute=time.getMinutes();
    const hoursFormat=hour>=13 ? hour%12: hour;
    const ampm=hour>=12 ? 'PM' : 'AM';
    //Time Updation
    
    if(minute<10){
        timeEl.innerHTML=hoursFormat + ':' + '0'+minute + ' ' + `<span id="am-pm">${ampm}</span>`;


    }
    else{
        timeEl.innerHTML=hoursFormat + ':' + minute + ' ' + `<span id="am-pm">${ampm}</span>`;


    }

    // timeEl.innerHTML=hoursFormat + ':' + minute + ' ' + `<span id="am-pm">${ampm}</span>`;


    //Date Updation

    dateEl.innerHTML=days[day]+','+date+' '+months[month];
    

},1000);

const searchBox=document.querySelector('.search input');
const searchBtn=document.querySelector('.search button');
        
  

getWeatherData();
function getWeatherData(city){

    
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=hourly,minutely&units=metric&appid=104a3496b76a2764b324f241805c401c`).then(res=>res.json()).then(data=>{
            console.log(data);
            showWeatherData(data);
        });
    
    
}
const humidityEl=document.getElementById("humidity");
const pressureEl=document.getElementById('pressure');
const windSpeedEl=document.getElementById('windSpeed');
const sunriseEl=document.getElementById('sunrise');
const sunsetEl=document.getElementById('sunset');
const visibilityEl=document.getElementById("visibility");
const currentTemp=document.getElementById("temp");


function showWeatherData(data){
   let humidity=data.main.humidity;
   let pressure=data.main.pressure;
   let sunrise=data.sys.sunrise;
   let sunset=data.sys.sunset;
   let wind_speed=data.wind.speed;
   let city_name=data.name;
   let visibility=data.visibility;
   let country=data.sys.country;
   let currentTemperature=data.main.temp;
   humidityEl.innerText=`${humidity}%`;
   pressureEl.innerText=`${pressure} hPa`;
   windSpeedEl.innerText=`${wind_speed} km/hr`;
   sunriseEl.innerText=`${window.moment(sunrise*1000).format('HH:mm a')}`;
   sunsetEl.innerText=`${window.moment(sunset*1000).format('HH:mm a')}`;
   visibilityEl.innerText=`${visibility} m`;
   currentTemp.innerHTML=`Temp: ${currentTemperature}&#176; C`;
   timeZone.innerText=`${city_name}`;
   countryEl.innerHTML=`${country}`;
   if(data.weather[0].main=="Clouds"){
    weatherIcon.src="images/clouds.png";

   }
   else if(data.weather[0].main=="Clear"){
    weatherIcon.src="images/clear.png";

   }
   else if(data.weather[0].main=="Rain"){
    weatherIcon.src="images/rain.png";

   }
   else if(data.weather[0].main=="Drizzle"){
    weatherIcon.src="images/drizzle.png";

   }
   else if(data.weather[0].main=="Mist"){
    weatherIcon.src="images/mist.png";

   }
   else if(data.weather[0].main=="Dust"){
    weatherIcon.src="images/dust.png";

   }
   else if(data.weather[0].main=="Haze"){
    weatherIcon.src="images/haze.png";

   }
   document.querySelector('.future-forecast').style.display="flex";
   weatherIcon.style.display="inherit";
   document.querySelector('.temp').style.display="inherit";
  
    
  





}
searchBtn.addEventListener("click",()=>{
    getWeatherData(searchBox.value);

})



