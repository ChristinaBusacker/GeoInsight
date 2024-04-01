import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import './Sidebar.css';
import { resetUrl } from '../../utils/resetUrl';
import { useQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../../gql/getWeather.query';

export const Sidebar = () => {
    const [coords, setCoords] = useState({ lat: null, lng: null });
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const handleLocationSet = (event) => {
            const { lat, lng } = event;
            console.log('resethandleLocationSet', lat, lng)
            setCoords({ lat, lng });
        };

        const params = new URLSearchParams(window.location.search);

        const lat = params.get('lat');
        const lng = params.get('lng');

        if (lat && lng) {
            console.log('koords', lat, lng)
            setCoords(lat, lng)
        }


        document.addEventListener('location-set', handleLocationSet);
        return () => document.removeEventListener('location-set', handleLocationSet);
    }, []);



    if (coords.lat && coords.lng) {

        const latNum = parseFloat(coords.lat);
        const lngNum = parseFloat(coords.lng);

        const { data } = useQuery(GET_WEATHER_QUERY, {
            variables: { lat: latNum, lon: lngNum },
            skip: !latNum || !lngNum,
            onCompleted: (data) => {
                setWeather(data.getWeather);
            }
        });
    }


    const close = () => {
        resetUrl();
    };

    const sidebarClass = coords.lat !== null && coords.lng !== null ? 'open' : '';

    console.log(weather || null, coords.lat, coords.lng)

    return (
        <div id="sidebar" class={sidebarClass}>
            <button onClick={close}>Close</button>

            <div>
                <p>Lat: {coords.lat}, Lng: {coords.lng}</p>
                {weather && <p>Wetter: {weather.current.temp}°C, {weather.current.weather[0].description}</p>}
            </div>

        </div>
    );
};
