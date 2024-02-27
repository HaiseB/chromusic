document.addEventListener('DOMContentLoaded', function () {
    const playPhenixAsked = window.location.href.includes('playing=RadioPhenix');
    const phenixRadioButton = document.getElementById('phenixRadioPlayPauseButton');
    const audioElement = new Audio('https://live.radio-campus.org:8002/caen.mp3');
    const pageTitleElement = document.querySelector('.modal-title');
    const phenixRadioVolumeDiv = document.getElementById('phenixRadioVolumeDiv');
    const volumeLabel = document.querySelector('label[for="phenixRadioVolume"]');
    const phenixRadioVolume = document.getElementById('phenixRadioVolume');
    const cachedVolume = localStorage.getItem('phenixRadioVolume');

    let isPlaying = false;

    function updateUI() {
        phenixRadioButton.innerHTML = `<span class="fade-in"><i class="fas fa-${isPlaying ? 'pause' : 'play'} fa-fw"></i></span>&nbsp; Radio Phénix`;
        pageTitleElement.innerHTML = `Chromusic <span class="fade-in">${isPlaying ? '- Radio Phénix is playing' : ''}</span>`;
        document.title = `Chromusic${isPlaying ? ' - Radio Phénix is playing' : ''}`;

        if (isPlaying) {
            phenixRadioVolumeDiv.style.display = phenixRadioVolumeDiv.style.display === 'none' ? 'block' : 'none';
            phenixRadioVolumeDiv.classList.add('fade-in');
        } else {
            phenixRadioVolumeDiv.style.display = 'none';
            phenixRadioVolumeDiv.classList.remove('fade-in'); // Pour être sûr que la classe est retirée si isPlaying est faux
        }    }

    if (playPhenixAsked) {
        isPlaying = true;
        audioElement.play();
        updateUI();
    }

    if (cachedVolume) {
        phenixRadioVolume.value = cachedVolume;
        audioElement.volume = cachedVolume / 100;
        volumeLabel.textContent = `Volume (${cachedVolume}%)`;
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

    phenixRadioVolume.addEventListener('input', function () {
        const volume = phenixRadioVolume.value / 100;

        localStorage.setItem('phenixRadioVolume', phenixRadioVolume.value);

        audioElement.volume = volume;
        volumeLabel.textContent = `Volume (${parseInt(volume*100)}%)`;
    });
});
