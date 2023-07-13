// Local (non DOM dependent) variables
var weatherAPIkey = '7fac6e8cffdaa3cd49f9c22da4505782';
var arg1 = 35.053726;
// var lat = "Fayetteville,US-NC";
var arg2 = -78.880234;

function getW(){
    let URL = buildURL();
    URL = "";
    console.log(URL);
    fetch(URL)
        .then(function (response){
            if(response.status != 200){
                console.log("response: ", response);
            }
            return response.json();
        })
        .then(function (data){
            console.log(">>> ", data);
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
        return 'http://api.openweathermap.org/geo/1.0/direct?q=' + arg1 + '&appid=' + weatherAPIkey;
    // Both args used, must be lat/lon   * TODO: maybe third option for empty str1???  ...  OR MAYBE isNumber something
    } else {
        // 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';
        return 'https://api.openweathermap.org/data/3.0/onecall?lat=' + arg1 + '&lon=' + arg2 + '&appid=' + weatherAPIkey;
    }
}

$(document).ready(function(){
    let citySearch = $('#city-search');
    let searchBtn = $('#search-button');
    let city = $('#city');
    let temp = $('#temp');
    let humidity = $('#humidity');
    let windSpeed = $('#wind-speed');

    city.text("Fayetteville");
    temp.text("69*");
    humidity.text("moist");
    windSpeed.text("blows");

    searchBtn.on('click', function(e){
        let cs = $(e.target).parent().children();
        console.log("button>> ", cs.val());
        city.text(cs.val());
    });
    //getW();
});

