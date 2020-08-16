config = JSON.parse(fs.readFileSync('config.json'))

var hdBox = document.getElementById('hdBox')
var nasa_key_inpt = document.getElementById('nasa_key_inpt')
var owm_key_inpt = document.getElementById('owm_key_inpt')
var numUpCheck = document.getElementById('numUpCheck')

window.onload = function() {
    if (config.hd) {
        hdBox.checked = true
    } else {
        hdBox.checked = false
    }

    if (config.nasa_key == "" || config.owm_key == "") {
        openSettings()
    }

    nasa_key_inpt.value = config.nasa_key
    owm_key_inpt.value = config.owm_key
    numUpCheck.value = parseInt(config.updateInterval)
}

function saveSettings() {
    if (hdBox.checked) {
        config.hd = true
    } else {
        config.hd = false
    }

    config.nasa_key = nasa_key_inpt.value
    config.owm_key = owm_key_inpt.value
    config.updateInterval = parseInt(numUpCheck.value)
    fs.writeFileSync('config.json', JSON.stringify(config, null, 4))

    location.reload()
}