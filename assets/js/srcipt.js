var weatherEl = $('#weather-container');
var apiKey = 'aa630346e91a6441f826ab5f7a6be4a5';

function search(location) {
    var apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}` //garbs dta from api call 
    fetch(apiUrl).then(responses => {
        if(responses.ok) {
            responses.json().then(data => {
                // console.log(data)
                oneCallApi(data.coord.lat, data.coord.lon) // gets longitude and latitude of the city and pass to oneCallApi function  
            })
        } else {
            alert("error: " + responses.statusText); // gives error if responses is not valid 
        }
    });
}

// Api function 
function oneCallApi(lat, lon) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey; // grabs data from api 
    fetch(apiUrl).then(responses => {
        if(responses.ok) {
            responses.json().then(data => {
                console.log("ALL DATA: ", data);
                displayAData(data.current);
                displayForecast(data.daily);
            })
        } else { // gives error if responses is not valid 
            alert("error:" + responses.statusText);
        }
    })
    
}

// Displays data on showing Weather for 
function displayAData(data) {
    weatherEl.html(""); // this clears up weather container div before rendering new data
    var image = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png" // pulls Icon for current weather
    var divEl = document.createElement('div');
    divEl.className = "border border-dark p-4";
    var todayEl = document.createElement('h2');
    todayEl.textContent = "Todays Date: " + moment().format('MM/DD/YYYY'); /// creates and formate current date
    var currentW = document.createElement('h2');
    currentW.innerHTML = "Current Weather: <img src='" + image + "' />" + data.weather[0].description ; // plus data with description of current weather 
    var tempEl = document.createElement('h4');
    tempEl.textContent = "Temp: " + data.temp + "°F"; // pulls temp data and creates 
    var windEl = document.createElement('h4');
    windEl.textContent = "Wind: " + data.wind_speed + " MPH";// pulls wind data and creates 
    var humEl = document.createElement('h4');
    humEl.textContent = "Humidity: " + data.humidity + "%"; // pulls humidity and creates 
    var uvEl = document.createElement('h4'); // pulls uvi and creates 
    uvEl.textContent = "UVI: " + data.uvi;


    divEl.append(todayEl, currentW, tempEl,windEl, humEl, uvEl);  /// appends main div to show case children within the div 
    weatherEl.append(divEl);

}

function displayForecast(data)  {
    console.log("DAILY DATA: ", data)
    var divContainerEl = document.createElement('div');
    divContainerEl.className = "d-flex flex-row flex-wrap justify-content-between";
    var fiveDayForecast = document.createElement('h1');
    fiveDayForecast.textContent = "5 Day Forecast";
    weatherEl.append(fiveDayForecast);

    for (let i = 0; i < 5; i++) {
        var image = "https://openweathermap.org/img/wn/" + data[i].weather[0].icon + "@2x.png"
        var cardEl = document.createElement('div');
        cardEl.className = "card text-center align-items-center p-3";
        var dateEL = document.createElement('h3');
        dateEL.textContent = moment().add((i + 1), 'd').format('MM/DD/YYYY');
        var futureWeather = document.createElement('h3');
        futureWeather.innerHTML =  "<img src='" + image + "' />" + data[i].weather[0].description
        var tempEL = document.createElement('h3');
        tempEL.textContent = "Temp: " + data[i].temp.day + "°F"
        var windEL = document.createElement('h3');
        windEL.textContent = "Wind: " + data[i].wind_speed + "MPH";
        var humEL = document.createElement('h3');
        humEL.textContent = "Humidity: " + data[i].humidity + "%";

        cardEl.append(dateEL, futureWeather, tempEL, windEL, humEL);
        divContainerEl.append(cardEl);
        
    }
    weatherEl.append(divContainerEl);
}



// List 5 day forecast


//  on click it gets location data fromm api 
$(document).on('click', '.btn', function(event) {
    event.preventDefault(); // prevents reloading page , form auto reloads page by default 
    var city = $('#city').val().trim() // gets city input 
    search(city);
})