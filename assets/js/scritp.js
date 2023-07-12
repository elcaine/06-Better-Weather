var weatherAPIkey = '7fac6e8cffdaa3cd49f9c22da4505782';
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var lat = 35.053726;
var lon = -78.880234;

var getW = function (lat, lon){
    lon = lat;
    lat = "Fayetteville,US-NC";
    //var URL = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + weatherAPIkey;
    // 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';
    var URL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + lat + '&appid=' + weatherAPIkey;
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

getW(lat, lon);

