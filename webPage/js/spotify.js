function clickRandomButton() {
    // ToDo find the right selector
    const spotifyButtons = document.querySelectorAll('[id="buttonTertiary"]');

    if (spotifyButtons.length > 0) {
        const randomIndex = Math.floor(Math.random() * spotifyButtons.length);
        const randomButton = spotifyButtons[randomIndex];

        randomButton.click();
    } else {
        console.log('impossible to play a random playlist');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.href.includes('playing=true')) {
        clickRandomButton();
    }
});