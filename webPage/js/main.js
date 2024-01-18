async function getSelectedTheme() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['selectedTheme'], function (result) {
            resolve(result.selectedTheme);
            console.log("Theme retrieved : "+result.selectedTheme)
        });
    });
}

async function start() {
    const selectedTheme = (await getSelectedTheme()) || 'vapor';
    const cssFileName = `${selectedTheme}.bootstrap.min.css`;
    const cssFilePath = `../bootstrap/${cssFileName}`;

    const styleLink = document.createElement('link');

    styleLink.rel = 'stylesheet';
    styleLink.type = 'text/css';
    styleLink.href = cssFilePath;
    document.head.appendChild(styleLink);
}

function highlightImage(imageId) {
    // Réinitialise la classe sur toutes les images
    const images = document.querySelectorAll('.img-fluid');
    images.forEach(function (image) {
        image.classList.remove('selected-theme');
    });

    // Ajoute la classe à l'image sélectionnée
    const selectedImage = document.getElementById(imageId);
    selectedImage.classList.add('selected-theme');
}

start();

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.getElementById('settingsButton');
    const additionalParams = document.getElementById('additionalParams');
    settingsButton.addEventListener('click', function () {
        // Basculer la visibilité des autres paramètres
        additionalParams.style.display = (additionalParams.style.display === 'none') ? 'block' : 'none';
    });

    const themeSelector = document.getElementById('themeSelector');
    const saveThemeButton = document.getElementById('saveThemeButton');

    // Charger la préférence actuelle
    chrome.storage.local.get(['selectedTheme'], function (result) {
        const selectedTheme = result.selectedTheme || 'vapor';
        themeSelector.value = selectedTheme;

        const correspondingImageId = selectedTheme + 'Image';
        highlightImage(correspondingImageId);
    });

    // Enregistrez le thème sélectionné lors du clic sur le bouton
    saveThemeButton.addEventListener('click', function () {
        const selectedTheme = themeSelector.value;
        chrome.storage.local.set({ 'selectedTheme': selectedTheme }, function () {
            console.log('Theme saved:', selectedTheme);

            // Actualiser la page pour appliquer immédiatement le nouveau thème
            location.reload();
        });
    });

    themeSelector.addEventListener('input', function () {
        const selectedTheme = this.value;
        const correspondingImageId = selectedTheme + 'Image';
        highlightImage(correspondingImageId);
    });

    document.getElementById('mintyImage').addEventListener('click', function () {
        document.getElementById('themeSelector').value = 'minty';
        highlightImage('mintyImage');
    });

    document.getElementById('quartzImage').addEventListener('click', function () {
        document.getElementById('themeSelector').value = 'quartz';
        highlightImage('quartzImage');
    });

    document.getElementById('solarImage').addEventListener('click', function () {
        document.getElementById('themeSelector').value = 'solar';
        highlightImage('solarImage');
    });

    document.getElementById('vaporImage').addEventListener('click', function () {
        document.getElementById('themeSelector').value = 'vapor';
        highlightImage('vaporImage');
    });
});

