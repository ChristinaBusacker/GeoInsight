import { h, Component } from 'preact';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css'
import { getLeafletMarker } from '../../utils/getLeafletMarker';
import { setUrl } from '../../utils/setUrl';
import { setLocation } from '../../utils/setLocation';
import { SearchInput } from '../SearchInput/SearchInput';

export class MapComponent extends Component {

  map = null;
  marker = null;

  componentDidMount() {

    const params = new URLSearchParams(window.location.search);

    const lat = params.get('lat');
    const lng = params.get('lng');

    this.map = L.map('map').setView([lat || 51.505, lng || -0.09], 4);


    this.map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      this.setMarker(e.latlng)
      setUrl(lat, lng);
    });

    this.initGPS()

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      minZoom: 3,

    }).addTo(this.map);

    document.addEventListener('location-set', (event) => {

      if (event.lat && event.lng) {

        this.map.panTo(new L.LatLng(event.lat, event.lng));
        this.setMarker(new L.LatLng(event.lat, event.lng))
      } else {
        this.map.removeLayer(this.marker)
        this.marker = null
      }



    });

    if (lat && lng) {
      // Delay for more beautiful sidebar opening
      setTimeout(() => { setLocation(lat, lng) }, 1000)
    }
  }

  setMarker(latlng) {
    if (this.marker) {
      this.marker.setLatLng(latlng);
    } else {
      this.marker = L.marker(latlng, { icon: getLeafletMarker() }).addTo(this.map);
    }

    return this.marker
  }

  initGPS() {
    const locateButton = L.control({ position: 'bottomright' });
    locateButton.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'locate-button');
      div.innerHTML = '<button>Mein Standort</button>';
      div.onclick = function () {
        map.locate({ setView: true, maxZoom: 16 });
      };
      return div;
    };
    locateButton.addTo(this.map);

    this.map.on('locationfound', (e) => {
      setLocation(e.latlng.lat, e.latlng.lng)
      this.setMarker(e.latlng).bindPopup("Du bist hier").openPopup();
    })

    this.map.on('locationerror', (e) => {
      alert(e.message);
    });
  }



  checkURLAndSetMarker() {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');
    const lon = params.get('lon');
    if (lat && lon) {
      const latlng = L.latLng(lat, lon);
      this.map.setView(latlng, 13);
      if (this.marker) {
        this.marker.setLatLng(latlng);
      } else {
        this.marker = L.marker(latlng).addTo(this.map);
      }
    }
  }

  render() {
    return (
      <div id="map-container">
        <SearchInput />
        <div id="map" style={{ height: '100%', width: '100%' }}></div>
      </div>

    );
  }
}