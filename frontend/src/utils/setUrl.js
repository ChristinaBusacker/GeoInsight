import { setLocation } from "./setLocation";

export function setUrl(lat, lng) {

    let latNum = parseFloat(lat);
    let lngNum = parseFloat(lng);

    lngNum = (lngNum + 180) % 360 - 180;

    if (lngNum < - 180) {
        lngNum += 360
    }

    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?lat=${latNum}&lng=${lngNum}`;
    window.history.pushState({ path: newurl }, '', newurl);

    setLocation(latNum, lngNum)
}