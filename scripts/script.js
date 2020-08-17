const axios = require('axios')
const fs = require('fs')

// Reads the config file
console.log('Reading config file...')
config = JSON.parse(fs.readFileSync('config.json'))

// Gets the required html tags
const imgTitle = document.getElementById('imgTitle')
const imgDate = document.getElementById('imgDate')
const imgExpl = document.getElementById('imgExpl')
const modal = document.getElementById('settingsModal')
const clock = document.getElementById('clock')
// Define how many ms in an hour
const msInHour = 3600000

// Get info from NASAs API
function getInfo() {
    console.log('Querying NASAs APOD API...')
    axios.get('https://api.nasa.gov/planetary/apod?api_key=' + config.nasa_key)
    .then(function (response) {
        // Sets the title of the image
        imgTitle.innerHTML = response.data.title
    
        // Gets the image copyright holder
        if (response.data.copyright == undefined) {
            // If no copyright information provided, assume NASA/JPL
            imgDate.innerHTML = 'NASA/JPL'
        } else {
            // Writes the copyright holders name next to the date
            imgDate.innerHTML = response.data.copyright
        }

        // Write the date date
        imgDate.innerHTML += ' &#8226; ' + response.data.date

        // Writes the image description
        imgExpl.innerHTML = response.data.explanation

        // Check media type provided
        if (response.data.media_type != 'image') {
            // If provided media is not image, use predefined image
            document.body.style.backgroundImage = "url('https://apod.nasa.gov/apod/image/2008/CrescentSaturn_cassini_4824.jpg')"
        } else {
            // If settings set to not use HD, do not use HD, otherwise use HD
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

// Closes the settings modal
function closeSettings() {
    modal.style.display = "none"
}

// If user presses outside the modal, close the modal
window.onclick = function(event) {
    if (event.target == modal) {
        closeSettings()
    }
}

// Gets the current time and writes it to the clock
function setClock() {
    var now = new Date()
    clock.innerHTML = now.toLocaleTimeString()
}

// Query NASAs API
getInfo()
// Write clock to screen
setClock()

// Update clock every second
setInterval(setClock, 1000)
// Update information user defined times per hour
setInterval(getInfo, msInHour/config.updateInterval)