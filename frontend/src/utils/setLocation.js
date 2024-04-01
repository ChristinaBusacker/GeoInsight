export function setLocation(lat = null, lng = null) {
    const event = new Event("location-set");

    event.lat = lat;
    event.lng = lng;

    document.dispatchEvent(event)
}