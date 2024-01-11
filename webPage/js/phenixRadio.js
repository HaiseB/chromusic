document.addEventListener('DOMContentLoaded', function () {
    const playPhenixAsked = window.location.href.includes('playing=RadioPhenix');
    const phenixRadioButton = document.getElementById('phenixRadioPlayPauseButton');
    const audioElement = new Audio('https://live.radio-campus.org:8002/caen.mp3');
    const pageTitleElement = document.querySelector('.modal-title');
    let isPlaying = false;

    function updateUI() {
        phenixRadioButton.innerHTML = `<span class="fade-in"><i class="fas fa-${isPlaying ? 'pause' : 'play'} fa-fw"></i></span>&nbsp; Radio Phénix`;
        pageTitleElement.innerHTML = `Chromusic <span class="fade-in">${isPlaying ? '- Radio Phénix is playing' : ''}</span>`;
        document.title = `Chromusic${isPlaying ? ' - Radio Phénix is playing' : ''}`;
    }

    if (playPhenixAsked) {
        isPlaying = true;
        audioElement.play();
        updateUI();
    }

    phenixRadioButton.addEventListener('click', function () {
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        isPlaying = !isPlaying;
        updateUI();
    });
});
