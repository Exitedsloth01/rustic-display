const weatherIco = document.getElementById('weatherIco')
const weatherCond = document.getElementById('weatherCond')
const weatherTemp = document.getElementById('weatherTemp')

function checkWeather() {
    axios.get('https://api.openweathermap.org/data/2.5/weather?id=2693555&units=metric&appid=' + config.owm_key)
    .then(function (weatherData) {
        weatherIco.src = 'https://openweathermap.org/img/wn/' + weatherData.data.weather[0].icon + '.png'
        weatherTemp.innerHTML = weatherData.data.main.temp + '&#176;C'
        weatherCond.innerHTML = weatherData.data.weather[0].main
    })
    .catch(function (error) {
        showNotice('Weather Error:', error)
    })

    console.log('Updated weather')
}

checkWeather()
setInterval(checkWeather, 60000)