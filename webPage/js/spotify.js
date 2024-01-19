async function getPlaylists() {
    return new Promise((resolve) => {
        chrome.storage.local.get(["spotifyPlaylists"], function (result) {
            resolve(result.spotifyPlaylists);
            console.log("Playlists retrieved : ", JSON.stringify(result.spotifyPlaylists, null, 2));
        });
    });
}

async function updatePlaylistUI() {
    const playlists = await getPlaylists();
    const ulIframe = document.getElementById('ul-iframe');

    // Supprimez les anciens éléments de la liste
    ulIframe.innerHTML = '';

    if (playlists && playlists.playlists) {
        // Ajoutez le titre "Playlists"
        const playlistsTitleLi = document.createElement('li');
        playlistsTitleLi.classList.add('list-group-item');
        playlistsTitleLi.textContent = 'Playlists';
        ulIframe.appendChild(playlistsTitleLi);

        // Ajoutez les playlists
        playlists.playlists.forEach((playlist, index) => {
            const iframeLi = document.createElement('li');
            iframeLi.classList.add('list-group-item', 'spotify-iframe');
            iframeLi.innerHTML = `
                <iframe title="${playlist.title}"
                    src="${playlist.src}" width="100%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>
            `;
            ulIframe.appendChild(iframeLi);
        });

        // Ajoutez le titre "Albums"
        const albumsTitleLi = document.createElement('li');
        albumsTitleLi.classList.add('list-group-item');
        albumsTitleLi.textContent = 'Albums';
        ulIframe.appendChild(albumsTitleLi);

        // Ajoutez les albums
        playlists.albums.forEach((album, index) => {
            const iframeLi = document.createElement('li');
            iframeLi.classList.add('list-group-item', 'spotify-iframe');
            iframeLi.innerHTML = `
                <iframe title="${album.title}"
                    src="${album.src}" width="100%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>
            `;
            ulIframe.appendChild(iframeLi);

            // Retirez la classe "spotify-iframe" du dernier élément des albums
            if (index === playlists.albums.length - 1) {
                iframeLi.classList.remove('spotify-iframe');
            }
        });

        // Ajoutez la classe "spotify-last-iframe" au dernier élément global
        const lastLi = ulIframe.lastElementChild;
        if (lastLi) {
            lastLi.classList.add('spotify-last-iframe');
        }
    }
}

async function start() {
    const playlists = await getPlaylists();
    const playlistTextarea = document.getElementById("playlistTextarea");

    if (!playlists) {
        const defaultSpotifyPlaylists = {
            playlists: [
                {
                    title: "Spotify Embed: Recommendation Playlist",
                    src: "https://open.spotify.com/embed/playlist/32NkwlZQYqno5HauO6FWvU",
                },
                {
                    title: "Daily mix 1",
                    src: "https://open.spotify.com/embed/playlist/37i9dQZF1E39VcQRsR3o26",
                },
                {
                    title: "Daily mix 2",
                    src: "https://open.spotify.com/embed/playlist/37i9dQZF1E36miGJAIINge",
                }
            ],
            albums: [
                {
                    title: "Ashnikko - Demidevil",
                    src: "https://open.spotify.com/embed/album/438ToDoVaJH5aTIXXrlDyI",
                },
                {
                    title: "Kalika - Adieu les monstres",
                    src: "https://open.spotify.com/embed/album/0UrbIea2sXlvZfMhD9PkFA",
                },
                {
                    title: "Melanie Martinez - Portals",
                    src: "https://open.spotify.com/embed/album/4kI7ZZF6CgDGFTjZNFwXYG",
                },
            ],
        };

        chrome.storage.local.set(
            { spotifyPlaylists: defaultSpotifyPlaylists },
            function () {
                console.log("Playlists saved : ", defaultSpotifyPlaylists);
            }
        );

        playlistTextarea.value = defaultSpotifyPlaylists;
    } else {
        playlistTextarea.value = playlists;
    }
}

function clickRandomButton() {
    // ToDo find the right selector
    const spotifyButtons = document.querySelectorAll('[id="buttonTertiary"]');

    if (spotifyButtons.length > 0) {
        const randomIndex = Math.floor(Math.random() * spotifyButtons.length);
        const randomButton = spotifyButtons[randomIndex];

        randomButton.click();
    } else {
        console.log("impossible to play a random playlist");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    start();
    updatePlaylistUI();

    if (window.location.href.includes("playing=true")) {
        clickRandomButton();
    }

    const playlistTextarea = document.getElementById("playlistTextarea");

    saveButton.addEventListener('click', function () {
        const spotifyPlaylists = playlistTextarea.value.replace(/(\r\n|\n|\r)/gm, "");
        chrome.storage.local.set({ spotifyPlaylists: spotifyPlaylists }, function () {
                console.log("Playlists saved : ", spotifyPlaylists);
                location.reload();
            }
        );
    });
});
