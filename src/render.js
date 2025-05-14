 const { ipcRenderer } = require('electron');
        
        document.getElementById('minimize-btn').addEventListener('click', () => {
            ipcRenderer.send('window-control', 'minimize');
        });
        
        document.getElementById('close-btn').addEventListener('click', () => {
            ipcRenderer.send('window-control', 'close');
        });