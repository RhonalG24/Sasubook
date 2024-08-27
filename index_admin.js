const { app, BrowserWindow } = require("electron");

function ElectronMainMethod(){
    const launchWindow = new BrowserWindow({
        title: "SasuBook Admin",
        width: 777,
        height: 444,
        icon: __dirname + '/client/public/SasuBook-Logo.png',
    });

    const appURL = "http://localhost:8000/admin";

    launchWindow.setOverlayIcon(nativeImage.createFromPath('/client/public/SasuBook-Logo.png'), 'SasuBook logo')
    launchWindow.loadURL(appURL);

}

app.whenReady().then(ElectronMainMethod)