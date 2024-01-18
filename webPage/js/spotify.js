async function getPlaylists() {
    return new Promise((resolve) => {
        chrome.storage.local.get(["spotifyPlaylists"], function (result) {
            resolve(JSON.stringify(result.spotifyPlaylists, null, 2));
            console.log("Playlists retrieved : ", JSON.stringify(result.spotifyPlaylists, null, 2));
        });
    });
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
                },
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

start();

document.addEventListener("DOMContentLoaded", function () {
    const playlistTextarea = document.getElementById("playlistTextarea");

    if (window.location.href.includes("playing=true")) {
        clickRandomButton();
    }
});
