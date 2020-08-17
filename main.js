const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // Sets the screen to fullscreen
    win.setFullScreen(true)
    
    // Hides the menu bar
    win.setAutoHideMenuBar(true)
    win.setMenuBarVisibility(false)

    // Load the idnex.html file
    win.loadFile('index.html')
}

app.whenReady().then(createWindow)