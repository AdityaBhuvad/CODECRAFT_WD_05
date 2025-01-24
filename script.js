
const data = 'data';
const units = 'metric';
const apiKey = "7825e05f8af15563539f78ddda60e3d9"
const apiUrl = `https://api.openweathermap.org/${data}/2.5/weather?units=${units}&q=`

let searchBox = document.querySelector(".searchBox");
let button = document.querySelector(".searchBtn");
let weatherInfo =document.querySelector(".weatherInfo");
let errorMessage=document.querySelector(".error")

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);
    try{
    if (response.status === 404) {
        
        errorMessage.style.display = "block";
        weatherInfo.style.display = "none";
    } 
    else {
        errorMessage.style.display = "none";
        weatherInfo.style.display = "flex";

       
        let image = document.querySelector(".weatherImg");

        if (data.weather[0].main == "Clear") {
            image.src = "./images/clear.png"
        }
        else if (data.weather[0].main == "Mist") {
            image.src = "./images/Mist.png"
        }
        else if (data.weather[0].main == "Snow") {
            image.src = "./images/snow.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            image.src = "./images/drizzle.png"
        }
        else if (data.weather[0].main == "Clouds") {
            image.src = "./images/clouds.png"
        }
        else if (data.weather[0].main == "Rain") {
            image.src = "./images/rain.png"
        }
        else if (data.weather[0].main == "Smoke") {
            image.src = "./images/mist.png"
        }

        let temp = document.querySelector(".tempCel").firstElementChild
        temp.innerText = Math.round(data.main.temp) + "°C"

        let cityName = document.querySelector(".cityName").firstElementChild
        cityName.innerText = data.name;

        let humidity = document.querySelectorAll(".humidity")[0].children[1].firstElementChild
        humidity.innerText = data.main.humidity + "%";

        let wind = document.querySelectorAll(".wind")[0].children[1].firstElementChild
        wind.innerText = data.wind.speed + "km/h";
        console.log(wind);
    }
    }
    catch (error){
        console.error("Error fething weather data:",error);
    }

   
}

button.addEventListener("click", () => {
    checkWeather(searchBox.value)

})
