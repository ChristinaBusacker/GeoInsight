import { setLocation } from "./setLocation";

export function setUrl(lat, lng) {
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?lat=${lat}&lng=${lng}`;
    window.history.pushState({ path: newurl }, '', newurl);

    setLocation(lat, lng)
}