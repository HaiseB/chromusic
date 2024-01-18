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


document.addEventListener('DOMContentLoaded', function () {
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

