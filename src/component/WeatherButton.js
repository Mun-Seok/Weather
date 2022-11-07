import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, selectCity, handleCityChange }) => {
    // console.log('도시 정보 잘들어오나', cities);
    return (
        <div className="weather-button-box">
            <Button variant={`${selectCity === '' ? 'danger' : 'outline-danger'}`} onClick={() => handleCityChange('current')}>
                Current Location
            </Button>{' '}
            {cities.map((item, index) => (
                <Button variant={`${selectCity === item ? 'danger' : 'outline-danger'}`} key={index} onClick={() => handleCityChange(item)}>
                    {item}
                </Button>
            ))}
        </div>
    );
};

export default WeatherButton;
