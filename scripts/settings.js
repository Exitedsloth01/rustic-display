config = JSON.parse(fs.readFileSync('config.json'))

var hdBox = document.getElementById('hdBox')
var api_key_inpt = document.getElementById('api_key_inpt')
var numUpCheck = document.getElementById('numUpCheck')

window.onload = function() {
    if (config.hd) {
        hdBox.checked = true
    } else {
        hdBox.checked = false
    }

    if (config.api_key == "") {
        openSettings()
    }

    api_key_inpt.value = config.api_key
    numUpCheck.value = config.updateInterval
}

function saveSettings() {
    if (hdBox.checked) {
        config.hd = true
    } else {
        config.hd = false
    }

    config.api_key = api_key_inpt.value
    config.updateInterval = numUpCheck.value
    fs.writeFileSync('config.json', JSON.stringify(config, null, 4))

    getInfo()
    closeSettings()
}