const weatherIco = document.getElementById('weatherIco')
const weatherCond = document.getElementById('weatherCond')
const weatherTemp = document.getElementById('weatherTemp')

function checkWeather() {
    axios.get('https://api.openweathermap.org/data/2.5/weather?id=2693555&units=metric&appid=5ee18850c8d1647b7d4884149f2724b2')
    .then(function (weatherData) {
        weatherIco.src = 'https://openweathermap.org/img/wn/' + weatherData.data.weather[0].icon + '.png'
        weatherTemp.innerHTML = weatherData.data.main.temp + '&#176;C'
        weatherCond.innerHTML = weatherData.data.weather[0].main
    })
    .catch(function (error) {
        console.log(error)
    })

    console.log('Updated weather')
}

checkWeather()

setInterval(checkWeather, 60000)