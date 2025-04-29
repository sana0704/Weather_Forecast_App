let cityname = document.querySelector(".weathcity");
let datetime = document.querySelector(".weathdatetime");
let data = document.querySelector(".weathdata");
let forecast = document.querySelector(".weathforecast");
let icon = document.querySelector(".weathicon");
let temp = document.querySelector(".weathtemp");
let mintemp = document.querySelector(".weathmin");
let maxtemp = document.querySelector(".weathmax");
let  feellike = document.querySelector(".weathfeelslike");
let  pressuree = document.querySelector(".pressure");
let  windd = document.querySelector(".wind");
let  humidityy = document.querySelector(".weathhumidity");
let citySearch = document.querySelector(".weathsearch");



const getCountryName =(code) =>{
return new Intl.DisplayNames([code],{type:"region"}).of(code);
};
// date and time
const getDatetime = (dt) =>{
   
    const curDate = new Date(dt*1000);
    console.log(curDate);
    const options = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US",options);
console.log(formatter);
    return  formatter.format(curDate);   
};


// async function
let city ="Bangalore";
citySearch.addEventListener("submit",(e) =>{
    e.preventDefault();
    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city =cityName.value;
    getweatherData();
    cityName.value=" ";
});

const getweatherData= async() =>{
    const weatherUrl =
     `api-hidden${city}`;

try{
    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);

    const {main, name , weather , wind , sys, dt} = data;
    cityname.innerHTML = `${name} ,${getCountryName(sys.country)}`;
datetime.innerHTML =getDatetime(dt);
forecast.innerHTML = weather[0].main;
icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;



temp.innerHTML = `${main.temp}&#176`;
mintemp.innerHTML=`min:${main.temp_min.toFixed()}&#176`;
maxtemp.innerHTML=`max:${main.temp_max.toFixed()}&#176`;
feellike.innerHTML = `${main.feels_like.toFixed()}&#176`;
windd.innerHTML = `${wind.speed}m/s`;
pressuree.innerHTML = `${main.pressure}hPa`;
humidityy.innerHTML = `${main.humidity}%`;






} catch(error) {
    console.log(error);
}

};



document.body.addEventListener("load",getweatherData());

