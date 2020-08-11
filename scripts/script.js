const axios = require('axios')
const fs = require('fs')

console.log('Reading config file...')
config = JSON.parse(fs.readFileSync('config.json'))
const imgTitle = document.getElementById('imgTitle')
const imgDate = document.getElementById('imgDate')
const imgExpl = document.getElementById('imgExpl')
const modal = document.getElementById('settingsModal')
const clock = document.getElementById('clock')
const msInHour = 3600000

function getInfo() {
    console.log('Querying NASAs APOD API...')
    axios.get(config.url + config.api_key)
    .then(function (response) {
        imgTitle.innerHTML = response.data.title
        imgDate.innerHTML = response.data.date + ' &#8226; '
    
        if (response.data.copyright == undefined) {
            imgDate.innerHTML += 'NASA/JPL'
        } else {
            imgDate.innerHTML += response.data.copyright
        }

        imgExpl.innerHTML = response.data.explanation

        if (response.data.media_type != 'image') {
            document.body.style.backgroundImage = "url('https://apod.nasa.gov/apod/image/2008/CrescentSaturn_cassini_4824.jpg')"
        } else {
            if (!config.hd) {
                document.body.style.backgroundImage = "url('" + response.data.url + "')"
            } else {
                document.body.style.backgroundImage = "url('" + response.data.hdurl + "')"
            }
        }
    })
    .catch(function (error){
        // Prints errors to the console
        console.log(error)
    })
}

// When the user clicks the gear icon, open the settings modal 
function openSettings() {
    modal.style.display = "block";
}

function closeSettings() {
    modal.style.display = "none"
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeSettings()
    }
}

function setClock() {
    var now = new Date()
    clock.innerHTML = now.toLocaleTimeString()
}

getInfo()

setInterval(setClock, 1000)
setInterval(getInfo, msInHour/config.updateInterval)