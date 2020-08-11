config = JSON.parse(fs.readFileSync('config.json'))

var hdBox = document.getElementById('hdBox')
var api_key_inpt = document.getElementById('api_key_inpt')

window.onload = function() {
    if (config.hd) {
        hdBox.checked = true
    }

    if (config.firstStart) {
        openSettings()
        config.firstStart = false
    }

    api_key_inpt.value = config.api_key
}

function saveSettings() {
    if (hdBox.checked) {
        config.hd = true
    } else {
        config.hd = false
    }

    config.api_key = api_key_inpt.value
    fs.writeFileSync('config.json', JSON.stringify(config, null, 4))

    location.reload()
}