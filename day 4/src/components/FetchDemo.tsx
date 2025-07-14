import { useState } from 'react';
import { useFetch } from '../hooks';


export function FetchDemo() {
    const [cityName, setCityName] = useState('Gurgaon');
    const [searchCity, setSearchCity] = useState('Gurgaon');

    const { data, loading, error} = useFetch<any>(
        `${import.meta.env.VITE_WEATHER_API_BASE_URL}/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${searchCity}`
    );

    const handleSearch = () => {
        setSearchCity(cityName);
        
    };

    const handleKeyPress = (e:  React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="demo-card">
            <h3>useFetch Hook - Weather API</h3>
            <p>Fetch weather data with city input and loading/error states.
             <br/>
            please enter proper name with first letter capital.
            </p>

            <div className="input-group">
                <label>City Name:</label>
                <input
                    type="text"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter city name"
                />
                <button onClick={handleSearch}>Get Weather</button>
            </div>

            <div className="status">
                {loading && <span>Loading...</span>}
                
                {error && <span >Error: {error}</span>}
                {data && <span >Success!</span>}
            </div>

            <div className="output">
                {data ? (
                    <div>
                        <div><strong>Location:</strong> {data.location.name}, {data.location.region}, {data.location.country}</div>
                        <div>
                            <strong>Temperature:  </strong>
                            {data.current.temp_c}°C ({data.current.temp_f}°F)
                        </div>
                        <div>
                            <strong>Condition:</strong>
                            {data.current.condition.text}

                        </div>
                        <div>
                            <strong>Feels Like:</strong>

                            {data.current.feelslike_c}°C ({data.current.feelslike_f}°F)
                        </div>
                        <div>
                            <strong>Humidity:</strong>
                            {data.current.humidity}%
                        </div>
                        <div><strong>Last Updated:</strong> {data.current.last_updated}</div>
                    </div>
                ) : (
                    'No weather data'
                )}
            </div>
        </div>
    );
}
