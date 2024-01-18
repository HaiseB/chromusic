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

start();
