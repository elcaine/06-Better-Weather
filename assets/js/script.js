// Local (non DOM dependent) variables
const weatherAPIkey = '7fac6e8cffdaa3cd49f9c22da4505782';
const numDays = 5;
const cityRayKey = 'cityRayKey';
const row = $('#stored-and-5day');
let cityRay;

// Initializes page (new landing or clear-storage-refresh)
function init(){
    let loadRay = localStorage.getItem(cityRayKey);
    if(loadRay){
        cityRay = JSON.parse(loadRay);
        searchedCitiesHTML(cityRay);
    } else{
        cityRay = new Array();
    }
}

// Core work/logic here:  waits on html build before starting
$(document).ready(function(){
    init();
    let searchBtn = $('#search-button');
    let clearBtn = $('#clear-me');

    // Search button for text input
    searchBtn.on('click', function(e){
        let city = $('#city-search').val();
        if(!city){
            console.log("No text entered");
            return;
        }
        saveSearchCityThenBuild(city);
        weatherAPI(city);
    });
    // Adds enter-to-submit functionality
    $('#city-search').keyup(function(e){
        if(e.which == 13){
            searchBtn.click();
        }
    });

    // Buttons for previous cities
    row.on('click', 'li', function(){
        console.log("herro there--> ", $(this).text());
        saveSearchCityThenBuild($(this).text());
        weatherAPI($(this).text());
    });

    // Clear localStorage button
    clearBtn.on('click', function(){
        localStorage.clear();
        location.reload();
        init();
    });
});

// City entered is saved to array, array saved to localStorage
function saveSearchCityThenBuild(city){
    city = city.toLowerCase();
    if(!cityRay.includes(city)){
        cityRay.push(city);
    }
    let rayStr = JSON.stringify(cityRay);
    localStorage.setItem(cityRayKey, rayStr);
    // Sends array for html build
    searchedCitiesHTML(cityRay);
}

// Builds html list of searched cities
function searchedCitiesHTML(cityRay){
    let div = $('<div>');
    let ul = $('<ul>');

    row.empty();
    div.addClass('col m2');
    ul.addClass('collection');
    for(let index = 0; index < cityRay.length; index++){
        let li = $('<li>');
        let a = $('<a>');
        li.addClass('collection-item');
        a.addClass('btn waves-effect waves-red waves-ripple');
    
        a.text(cityRay[index]);
        li.append(a);
        ul.append(li);
    }
    div.append(ul);
    row.append(div);
}

// Builds URL for openweathermap app
function buildURL(latlon){
    // return 'http://api.openweathermap.org/geo/1.0/reverse?lat=' + arg1 + '&lon=' + arg2 + '&appid=' + weatherAPIkey;
    return 'https://api.openweathermap.org/data/3.0/onecall?lat=' + latlon[0] + '&lon=' + latlon[1] + '&appid=' + weatherAPIkey + '&units=imperial';
}

// Builds/sends city to openweathermap geolocation services to get lan/lon
function weatherAPI(city){
    // + city + ',NC,US&appid=' + weatherAPIkey;
        // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    let URL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + weatherAPIkey;

    fetch(URL)
        .then(function (response){
            if(response.status != 200){
                console.log("lat/lon not gott'd", response);
            }
            return response.json();
        })
        .then(function (data){
            try{
                $('#city').text(data[0].name + " " + dayjs().format('M/D/YY'));
                let lat = data[0].lat;
                let lon = data[0].lon;
                getWeather([lat, lon]);
            }
            catch{
                console.log("data[0].name undefined maybe, data: ", data);    let temp = $('#temp');
                $('#temp').text('');
                $('#humidity').text('');
                $('#wind-speed').text('');
                $('#city').text('<No city found>');
            }
        });
}

// Builds/sends lat/lon to openweathermap to get weather data
function getWeather(latlon){
    let URL = buildURL(latlon);
    
    fetch(URL)
        .then(function (response){
            if(response.status != 200){
                console.log("!!!PROBLEMS IN FETCH!!!: ", response);
            }
            return response.json();
        })
        .then(function (data){
            todayWeather(data.current);
            futureWeather(data.daily);
        });
}

// Builds html for current day, current city weather
function todayWeather(w){
    let citySearch = $('#city-search');
    let temp = $('#temp');
    let humidity = $('#humidity');
    let windSpeed = $('#wind-speed');
    let iconCode = w.weather[0].icon;
    let img = makeImg(iconCode);
    
    $('#city').append(img);
    temp.text("Temp: " + w.temp);
    humidity.text("Humidity: " + w.humidity);
    windSpeed.text("Wind speed: " + w.wind_speed);
    citySearch.val('');
}

// Builds html for 5-day forecast for current city
function futureWeather(w){
    let row = $('#stored-and-5day');
    let day = dayjs();
    for(let index = 0; index < numDays; index++){
        day = day.add(1, 'day');
        let div1 = $('<div>');
        let div2 =$('<div>');
        let span = $('<span>');
        let i = $('<i>');
        let img = makeImg(w[index].weather[0].icon);
        i.append(img);
        let temp = $('<h6>');
        let humid = $('<h6>');
        let wind = $('<h6>');

        div1.addClass('col m2');
        div2.addClass('card blue-grey darken-1 card-content white-text');
        span.addClass('card-title');
        span.text(day.format('M/D/YY'));
        temp.attr('id', "temp");
        humid.attr('id', "humid");
        wind.attr('id', "wind");
    
        temp.text("Temp: " + w[index].temp.day);
        humid.text("Humidity: " + w[index].humidity);
        wind.text("Wind: " + w[index].wind_speed);
        div2.append(span, i, temp, humid, wind);
        div1.append(div2);
        row.append(div1);
    }
}

// Builds html icon element for openweathermap's icons
function makeImg(code){
    var iconurl = "http://openweathermap.org/img/w/" + code + ".png";
    let img = $('<img>');
    
    img.attr('src', iconurl);
    img.attr('width', '50');
    img.attr('height', '50');
    img.attr('alt', "weather-icon");
    return img;
}