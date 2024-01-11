document.addEventListener("DOMContentLoaded", function () {
  const openAudioButton = document.getElementById("openAudioPage");

  function updateButtonAndRect() {
    // Chercher tous les onglets ouverts
    chrome.tabs.query({}, function (tabs) {
      // Vérifier si l'onglet "audio.html" est déjà ouvert
      const audioPageOpen = tabs.some(
        (tab) => tab.url && tab.url.includes("webPage/index.html")
      );

      // Mettre à jour le texte du bouton en fonction de l'existence de l'onglet
      openAudioButton.textContent = audioPageOpen
        ? "Go to Audio Player"
        : "Open Audio Player";

      // Mettre à jour la classe du div "playing" en fonction de l'existence de l'onglet
      playingRect.classList.toggle("playing", audioPageOpen);
    });
  }

  openAudioButton.addEventListener("click", function () {
    // Chercher tous les onglets ouverts
    chrome.tabs.query({}, function (tabs) {
      // Vérifier si l'onglet "audio.html" est déjà ouvert
      const audioPageOpen = tabs.some(
        (tab) => tab.url && tab.url.includes("webPage/index.html")
      );

      // Si trouvé, activer l'onglet existant
      if (audioPageOpen) {
        const audioTab = tabs.find(
          (tab) => tab.url && tab.url.includes("webPage/index.html")
        );
        chrome.tabs.update(audioTab.id, { active: true });
      } else {
        // Sinon, ouvrir un nouvel onglet
        chrome.tabs.create({
          url: chrome.runtime.getURL("webPage/index.html"),
        });
      }

      // Mettre à jour le texte du bouton et la classe du div "playing" après l'action
      updateButtonAndRect();
    });
  });

  // Mettre à jour le texte du bouton et la classe du div "playing" lors du chargement initial
  updateButtonAndRect();
});
