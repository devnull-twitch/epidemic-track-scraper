console.log('scraper content script start');

let lastTrackName = '';
let token = '';

const setup = async (browser) => {
    const res = await browser.storage.local.get(['token']);
    token = res.token;
};
setup(browser);

const scrape = async () => {
    try {
        console.log('scraper callback with token', token);
        if (token == '') {
            return;
        }

        const nodeList = document.querySelectorAll('[data-cy-playerbar]');
        if (nodeList.length <= 0) {
            console.error('scraper did not find web player');
            return;
        }

        const trackName = nodeList[0].querySelector('[class*=TrackInfo__title]').textContent;
        const artistName = nodeList[0].querySelector('[class*=CreativesLabel]').textContent;
    
        if (trackName != lastTrackName) {
            lastTrackName = trackName;
            const resp = await fetch('https://devnullga.me/bot/track/' + token, {
                body: JSON.stringify({
                    track_name: trackName,
                    artist_name: artistName,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            });
            console.log('track update response status code', resp.status);
        }
    } catch (e) {
        console.error('scraper error', e);
    }
}

setInterval(scrape, 1000);