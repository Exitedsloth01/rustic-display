const axios = require('axios')
const fs = require('fs')

console.log('Reading config file...')
config = JSON.parse(fs.readFileSync('config.json'))
const imgTitle = document.getElementById('imgTitle')
const imgDate = document.getElementById('imgDate')
const imgExpl = document.getElementById('imgExpl')

if (config.hd) {
    url = config.url += config.api_key + '&hd=true'
} else {
    url = config.url += config.api_key
}

console.log('Querying NASAs APOD API...')
axios.get(url)
.then(function (response) {
    imgTitle.innerHTML = response.data.title
    imgDate.innerHTML = response.data.date + ' &#183; '
    
    if (response.data.copyright == undefined) {
        imgDate.innerHTML += 'NASA/JPL'
    } else {
        imgDate.innerHTML += response.data.copyright
    }

    imgExpl.innerHTML = response.data.explanation

    if (response.data.media_type != 'image') {
        document.body.style.backgroundImage = "url('https://apod.nasa.gov/apod/image/2008/CrescentSaturn_cassini_4824.jpg')"
    } else {
        document.body.style.backgroundImage = "url('" + response.data.hdurl + "')"
    }
})
.catch(function (error){
    // Prints errors to the console
    console.log(error)
})