import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    /* 
  1. 앱이 실행이 되자마자 현재 위치 기반의 날씨가 보인다.
  2. 지금 현재 도시, 섭씨, 화씨 날씨 상태 정보가 나온다.
  3. 밑에 버튼이 5개 있다. (현재 위치, 다른 도시 4개)
  4. 버튼을 누를때 마다 해당되는 도시별 날씨가 보여진다.
  5. 현재위치 버튼을 누르면 다시 현재 위치 기반의 날씨 정보를 보여준다.
  6. 데이터를 들고오는 동안 로딩 스피너가 돌아간다. 
  */
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState('');
    const cities = ['paris', 'new york', 'beijing', 'tokyo', 'seoul'];
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            // console.log('현재 위도 경도는??', lat, lon);
            getWeatherByCurrentLocation(lat, lon);
        });
    };

    const getWeatherByCurrentLocation = async (lat, lon) => {
        try {
            let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=483d36d7708297068b45cad45e18d9f7`);
            setLoading(true);
            let response = await fetch(url);
            let data = await response.json();
            // console.log('데이터는?', data);
            setWeather(data);
            setLoading(false);
        } catch (err) {
            setApiError(err.message);
            setLoading(true);
        }
    };

    const getWeatherByCity = async () => {
        try {
            let url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=483d36d7708297068b45cad45e18d9f7`);
            setLoading(true);
            let response = await fetch(url);
            let data = await response.json();
            // console.log('도시 날씨 데이터 잘들어오나?', data);
            setWeather(data);
            setLoading(false);
        } catch (err) {
            setApiError(err.message);
            setLoading(true);
        }
    };

    useEffect(() => {
        if (city === '') {
            setLoading(true);
            getCurrentLocation();
        } else {
            setLoading(true);
            getWeatherByCity();
        }
    }, [city]);

    const handleCityChange = (city) => {
        if (city === 'current') {
            setCity('');
        } else {
            setCity(city);
        }
    };

    return (
        <div className="App">
            {loading ? (
                <div className="container">
                    <ClipLoader color="#FF0000" loading={loading} size={150} />
                </div>
            ) : !apiError ? (
                <div className="container">
                    <WeatherBox weather={weather} />
                    <WeatherButton cities={cities} selectCity={city} handleCityChange={handleCityChange} />
                </div>
            ) : (
                <div className="container">
                    <h2>{apiError}</h2>
                </div>
            )}
        </div>
    );
}

export default App;
