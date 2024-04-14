import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import './CurrentWeather.css'

export const CurrentWeather = ({ weather }) => {

    const [current, setCurrent] = useState(null);

    useEffect(() => {
        const weatherId = weather.weather[0].id
        console.log(weatherId)

        if (weatherId < 600) {
            setCurrent('rain')
        } else if (weatherId > 599 && weatherId < 800) {
            setCurrent('snow')
        } else if (weatherId > 800) {
            setCurrent('cloudy')
        } else {
            setCurrent('sun')
        }
    }, [weather]);

    const describeWind = () => {
        let direction;

        if (weather.wind_deg > 337.5 || weather.wind_deg <= 22.5) {
            direction = "Norden";
        } else if (weather.wind_deg > 22.5 && weather.wind_deg <= 67.5) {
            direction = "Nordosten";
        } else if (weather.wind_deg > 67.5 && weather.wind_deg <= 112.5) {
            direction = "Osten";
        } else if (weather.wind_deg > 112.5 && weather.wind_deg <= 157.5) {
            direction = "Südosten";
        } else if (weather.wind_deg > 157.5 && weather.wind_deg <= 202.5) {
            direction = "Süden";
        } else if (weather.wind_deg > 202.5 && weather.wind_deg <= 247.5) {
            direction = "Südwesten";
        } else if (weather.wind_deg > 247.5 && weather.wind_deg <= 292.5) {
            direction = "Westen";
        } else if (weather.wind_deg > 292.5 && weather.wind_deg <= 337.5) {
            direction = "Nordwesten";
        }

        return direction;
    }

    return (
        <div id="current-weather">
            <img className='background' src={'assets/images/weather/' + current + '.jpg'}></img>
            <div className='background overlay'></div>
            <div className='temp'>
                <h2>
                    {weather.temp} °C
                </h2>
                <span>(Gefühlt {weather.feels_like}°C)</span>
            </div>
            <div className='description'>
                <img height="50px" src={'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'}></img>
                <strong>{weather.weather[0].description}</strong>
            </div>
            <div className='details'>
                <span>Luftfeuchtigkeit: {weather.humidity}%</span>
                <span>Windgeschwindigkeit: {weather.wind_speed}m/s</span>
                <span>Windrichtung: {describeWind()}</span>
            </div>
        </div>
    )
};