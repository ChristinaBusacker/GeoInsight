import { h } from 'preact';
import { render } from 'preact';
import App from './app';
import { setLocation } from './utils/setLocation';

import './index.css';

render(<App />, document.getElementById('root'));


window.addEventListener('popstate', (event) => {
    const params = new URLSearchParams(window.location.search);

    const lat = params.get('lat');
    const lng = params.get('lng');

    if (lat !== null && lng !== null) {
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);

        if (!isNaN(latNum) && !isNaN(lngNum)) {
            setLocation(latNum, lngNum);
        } else {
            console.error("Die 'lat' und 'lng' Parameter sind keine gültigen Zahlen.");
        }
    } else {
        console.log("URL enthält keine 'lat' und 'lng' Parameter.");
    }
});