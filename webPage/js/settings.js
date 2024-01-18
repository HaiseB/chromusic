document.addEventListener('DOMContentLoaded', function () {
    const openSettingsAsked = window.location.href.includes('openSettings=true');
    const settingsButton = document.getElementById('settingsButton');
    const additionalParams = document.getElementById('additionalParams');

    if(openSettingsAsked) {
        additionalParams.style.display = 'block';
        setTimeout(function () {
            additionalParams.scrollIntoView();
        }, 100);
    }

    settingsButton.addEventListener('click', function () {
        additionalParams.style.display = (additionalParams.style.display === 'none') ? 'block' : 'none';
    });
});
