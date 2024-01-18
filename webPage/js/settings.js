document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.getElementById('settingsButton');
    const additionalParams = document.getElementById('additionalParams');
    settingsButton.addEventListener('click', function () {
        // Basculer la visibilité des autres paramètres
        additionalParams.style.display = (additionalParams.style.display === 'none') ? 'block' : 'none';
    });
});
