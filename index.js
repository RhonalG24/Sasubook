const { app, BrowserWindow } = require("electron");

function ElectronMainMethod(){
    const launchWindow = new BrowserWindow({
        title: "SasuBook",
        width: 777,
        height: 444
    });

    const appURL = "http://localhost:5173";

    launchWindow.loadURL(appURL);

}

app.whenReady().then(ElectronMainMethod)