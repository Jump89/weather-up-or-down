var apiKey = 'aa630346e91a6441f826ab5f7a6be4a5'

function search() {
    var apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=brooklyn&appid=${apiKey}`
    fetch(apiUrl).then(responses => {
        if(responses.ok) {
            responses.json().then(data => {
                // console.log(data)
                oneCallApi(data.coord.lat, data.coord.lon)
            })
        } else {
            alert("error: " + responses.statusText);
        }
    });
}

function oneCallApi(lat, lon) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
    fetch(apiUrl).then(responses => {
        if(responses.ok) {
            responses.json().then(data => {
                console.log(data)

            })
        } else {
            alert("error:" + responses.statusText);
        }
    })
    
}

search();