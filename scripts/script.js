const axios = require('axios')

const isHd = true
const api_key = 'lWVyvaBEdLuWGL1df3POmdO4ZYZ3JhWTwNcYuKkO'
url = 'https://api.nasa.gov/planetary/apod?api_key='
const imgTitle = document.getElementById('imgTitle')
const imgDate = document.getElementById('imgDate')
const imgExpl = document.getElementById('imgExpl')

if (isHd) {
    url += api_key + '&hd=true'
} else {
    url += api_key
}

console.log(url)
console.log('Asking for info from NASAs API...')

axios.get(url)
.then(function (response) {
    imgTitle.innerHTML = response.data.title
    imgDate.innerHTML = response.data.date
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

function showOptions() {
    console.log('Settings opened')
}