import React from 'react';

const WeatherBox = ({ weather }) => {
    let celsius = (weather?.main.temp - 273.15).toFixed(1);
    let fahrenheit = ((celsius * 9) / 5 + 32).toFixed(1);
    // console.log('weather 정보 잘들어왔나?', weather);
    return (
        <div className="weather-box">
            <div>{weather?.name}</div>
            {/* null을 줘서 오류날 수 있음 -> 조건연산으로 해결 */}
            <h2>
                {celsius}℃ / {fahrenheit}℉
            </h2>
            <h3>{weather?.weather[0].description}</h3>
        </div>
    );
};

export default WeatherBox;
