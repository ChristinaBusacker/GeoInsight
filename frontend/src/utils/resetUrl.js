import { setLocation } from "./setLocation";

export function resetUrl() {
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState({ path: newurl }, '', newurl);

    setLocation()
}