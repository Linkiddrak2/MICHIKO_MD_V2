// ALL HAIL LORD SHEFZY 
const fs = require('fs');
const path = require('path');
const settingsPath = path.join(__dirname, 'system/settings.json');

function loadSettings() {
    if (!fs.existsSync(settingsPath)) {
        fs.writeFileSync(settingsPath, JSON.stringify({
            autoread: { enabled: false },
            autorecord: { enabled: false },
            autotyping: { enabled: false },
        }, null, 2));
    }

    try {
        return JSON.parse(fs.readFileSync(settingsPath));
    } catch (e) {
        console.error("Error loading settings.json, returning default settings.", e);
        return { autoread: { enabled: false }, autorecord: { enabled: false }, autotyping: { enabled: false } };
    }
}

function saveSettings(settings) {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

module.exports = { loadSettings, saveSettings };