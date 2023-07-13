// Local (non DOM dependent) variables
var weatherAPIkey = '7fac6e8cffdaa3cd49f9c22da4505782';
var arg1 = "Fayetteville";
// var arg1 = 35.053726;
var arg2;// = -78.880234;

function getW(){
    let URL = buildURL();
    console.log(URL);
    fetch(URL)
        .then(function (response){
            if(response.status != 200){
                console.log("!!!PROBLEMS IN FETCH!!!: ", response);
            }
            return response.json();
        })
        .then(function (data){
            console.log(">>> ", JSON.stringify(data));
            // Taken from Twitter example (.name prolly Twit specific)
            // for (var i = 0; i < data.length; i++) {
            //   console.log(data[i].name);
            // }
        })
}

function buildURL(){
    // 2nd arg empty, must be city
    if(!arg2 || arg2 === ""){
        console.log("$$$$$$$$$$$$$$\nstr2: ", arg2, "\ttype: ", typeof(arg2));
        // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
        return 'http://api.openweathermap.org/geo/1.0/direct?q=' + arg1 + ',NC,US&appid=' + weatherAPIkey;
        // Both args used, must be lat/lon   * TODO: maybe third option for empty str1???  ...  OR MAYBE isNumber something
    } else {
        // return 'http://api.openweathermap.org/geo/1.0/reverse?lat=' + arg1 + '&lon=' + arg2 + '&appid=' + weatherAPIkey;
        return 'https://api.openweathermap.org/data/3.0/onecall?lat=' + arg1 + '&lon=' + arg2 + '&appid=' + weatherAPIkey;
    }
}

function makeImg(code){
    var iconurl = "http://openweathermap.org/img/w/" + code + ".png";
    let img = $('<img>');
    
    img.attr('src', iconurl);
    img.attr('width', '50');
    img.attr('height', '50');
    img.attr('alt', "weather-icon");
    return img;
}

$(document).ready(function(){let citySearch = $('#city-search');
    let searchBtn = $('#search-button');
    let city = $('#city');
    let temp = $('#temp');
    let humidity = $('#humidity');
    let windSpeed = $('#wind-speed');

    searchBtn.on('click', function(e){
        let cs = $(e.target).parent().children();

        // TODO:  Need logic to grab this code for reelz
        let iconCode = "10d";
        let img = makeImg(iconCode);
        
        city.text(cs.val());
        city.append(img);
        temp.text("69*");
        humidity.text("moist");
        windSpeed.text("blows");
        cs.val('');
    });
    // getW();
});

