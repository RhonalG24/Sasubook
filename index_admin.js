const { app, BrowserWindow } = require("electron");

function ElectronMainMethod(){
    const launchWindow = new BrowserWindow({
        title: "SasuBook Admin",
        width: 777,
        height: 444
    });

    const appURL = "http://localhost:8000/admin";

    launchWindow.loadURL(appURL);

}

app.whenReady().then(ElectronMainMethod)