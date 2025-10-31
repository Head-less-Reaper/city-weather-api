
document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById("city-input");
    const weatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errorMessage= document.getElementById('error-message');
    const API_KEY ="d281222c7ca306fef42e63a699945110";

    weatherBtn.addEventListener('click',async ()=>{
        const city = cityInput.value.trim();
        if(!city)return;
        try {
            const weatherData =await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })
    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const response = await fetch(url);  //fetch API
        console.log(typeof response);
        console.log("RESPONSE" ,response);
        if(!response.ok){
            throw new Error("City Not Found");
        }
        const result = await response.json();
        console.log("RESULT",result);
        
        return result;
        
    }
    function displayWeatherData(weatherData){

        const{name,main,weather}=weatherData;
        cityName.textContent = name;
        temperature.textContent = `Temperature : ${main.temp}`;
        description.textContent =`Weather : ${ weather[0].main}`;
        //unlock display
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }
    function showError(){
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
})