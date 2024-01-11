document.addEventListener('DOMContentLoaded', function () {
    const phenixRadioButton = document.getElementById('phenixRadioPlayPauseButton');
    const audioElement = new Audio('https://live.radio-campus.org:8002/caen.mp3');
    const pageTitleElement = document.querySelector('.modal-title');
    let isPlaying = false;

    phenixRadioButton.addEventListener('click', function () {
        if (isPlaying) {
            audioElement.pause();
            phenixRadioButton.innerHTML = '<span class="fade-in"><i class="fas fa-play fa-fw"></i></span>&nbsp; Radio Phénix';
            pageTitleElement.textContent = 'Chromusic';
            document.title = 'Chromusic';
        } else {
            audioElement.play();
            phenixRadioButton.innerHTML = '<span class="fade-in"><i class="fas fa-pause fa-fw"></i></span>&nbsp; Radio Phénix';
            pageTitleElement.innerHTML = 'Chromusic <span class="fade-in">- Radio Phénix is playing</span>';
            document.title = 'Chromusic - Radio Phénix is playing';
        }
        isPlaying = !isPlaying;
    });
});