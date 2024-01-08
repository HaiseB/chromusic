const audioPlayer = document.getElementById('audioPlayer');

audioPlayer.addEventListener('play', function () {
  // Logique à effectuer lors de la lecture (si nécessaire)
});

audioPlayer.addEventListener('pause', function () {
  // Logique à effectuer lors de la pause (si nécessaire)
});

audioPlayer.addEventListener('ended', function () {
  // Logique à effectuer lorsque la lecture est terminée (si nécessaire)
});


document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.getElementById('settingsButton');
    const additionalParams = document.getElementById('additionalParams');
    settingsButton.addEventListener('click', function () {
      // Basculer la visibilité des autres paramètres
        additionalParams.style.display = (additionalParams.style.display === 'none') ? 'block' : 'none';
    });
});
