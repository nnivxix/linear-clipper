// This file contains the JavaScript code for the options page, handling user interactions and saving settings.

document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save');
    const inputField = document.getElementById('inputField');

    // Load saved settings
    chrome.storage.sync.get(['settingKey'], function(result) {
        inputField.value = result.settingKey || '';
    });

    // Save settings on button click
    saveButton.addEventListener('click', function() {
        const settingValue = inputField.value;
        chrome.storage.sync.set({ settingKey: settingValue }, function() {
            console.log('Settings saved:', settingValue);
        });
    });
});