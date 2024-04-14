import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import './Sidebar.css';
import { resetUrl } from '../../utils/resetUrl';
import { useQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../../gql/getWeather.query';
import { CurrentWeather } from '../CurrentWeather/CurrentWeather';
import { GET_ADRESS_BY_COORDS_QUERY } from '../../gql/getAddressByCoords';
import { GET_PHOTOS_BY_LOCATION_QUERY } from '../../gql/getPhotosByLocation';
import PhotoGrid from '../PhotoGrid/PhotoGrid';

export const Sidebar = () => {
    const [coords, setCoords] = useState({ lat: null, lng: null });
    const [adress, setAdress] = useState(null);
    const [weather, setWeather] = useState(null);
    const [localTime, setLocalTime] = useState('');
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const handleLocationSet = (event) => {
            const { lat, lng } = event;

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


    useEffect(() => {
        const updateLocalTime = () => {
            if (weather && weather.timezone) {
                const now = new Date();
                const timeString = now.toLocaleTimeString('de-DE', {
                    timeZone: weather.timezone,
                    hour: '2-digit',
                    minute: '2-digit'
                });
                setLocalTime(timeString);
            }
        };

        const timerId = setInterval(updateLocalTime, 1000);
        return () => clearInterval(timerId);
    }, [weather]);



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

        const adressData = useQuery(GET_ADRESS_BY_COORDS_QUERY, {
            variables: { lat: latNum, lon: lngNum },
            skip: !latNum || !lngNum,
            onCompleted: (data) => {
                console.log(data.getAddressByCoords.address)
                setAdress(data.getAddressByCoords.address)
            }
        });

        const photoData = useQuery(GET_PHOTOS_BY_LOCATION_QUERY, {
            variables: { lat: latNum, lon: lngNum },
            skip: !latNum || !lngNum,
            onCompleted: (data) => {
                const newPhotos = data.getPhotosByLocation.map(photo => photo.url)
                setPhotos(newPhotos)
            }
        });

    }


    const close = () => {
        resetUrl();
    };

    const sidebarClass = coords.lat !== null && coords.lng !== null ? 'open' : '';
    const locationPreciseLevel = adress?.road ? 1 : adress?.city ? 2 : adress?.state ? 3 : 4;

    return (
        <div id="sidebar" class={sidebarClass}>
            <button className='sidebar-close' onClick={close}>x</button>

            <div>
                {adress &&
                    <div className='adress'>
                        {adress.road &&
                            <span className={locationPreciseLevel === 1 ? 'main' : ''}>{adress.road}</span>
                        }
                        {adress.city &&
                            <span className={locationPreciseLevel === 2 ? 'main' : '2nd'}>{adress.city}{locationPreciseLevel === 1 ? ', ' : ''}</span>
                        }
                        {adress.state &&
                            <span className={locationPreciseLevel === 3 ? 'main' : '2nd'}>{adress.state}{locationPreciseLevel < 3 ? ', ' : ''}</span>
                        }
                        {adress.country &&
                            <span className={locationPreciseLevel === 4 ? 'main' : locationPreciseLevel === 2 ? '2nd' : '3rd'}>{adress.country}</span>
                        }
                    </div>
                }
                {weather &&
                    <div>
                        {localTime &&
                            <p className='time'>Lokale Zeit: {localTime}</p>
                        }

                        <CurrentWeather weather={weather.current} />
                    </div>
                }
                <div id="photos">
                    <PhotoGrid photos={photos}></PhotoGrid>
                </div>

            </div>

        </div >
    );
};
