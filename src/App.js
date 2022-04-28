import React, {useEffect, useState } from 'react'
const api = {
  key: "733af6e392f5341bc46439fd28c50ad2",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('lagos')
  const [weather, setWeather] = useState({})

  const search = evt => { //evt here stands for event :: function we ll use to actually get our weather info
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        })
    }
  }
  
useEffect(() => {
  search()
}, []);

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <h1>Weather-App</h1>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Enter a location here..." onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
           <input type="hidden" 
            value={query}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('LOCATION NOT FOUND! 🌐')}
      </main>
    </div >
  );
}

export default App;
