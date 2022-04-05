import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App () {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [isOneCountry, setIsOneCountry] = useState(false)
  const [weather, setWeather] = useState({
    name: '',
    temperature: '',
    img: '',
    wind: '',
    speed: ''
  })

  const setSearchValue = (e) => {
    e.preventDefault()
    setSearchCountry(e.target.value)
  }

  const showDetails = (e) => {
    // const index = countries.findIndex(
    //   (ele) => ele.name.common === e.target.value
    // )
    setSearchCountry(e.target.value)
    setIsOneCountry(true)
  }

  // countries
  useEffect(() => {
    if (searchCountry === '') return
    axios
      .get(`https://restcountries.com/v3.1/name/${searchCountry}`)
      .then(({ data }) => {
        console.log(data)
        setCountries(data)
        if (data.length === 1) {
          setIsOneCountry(true)
        }
        console.log(isOneCountry)
      })
      .catch((e) => console.log(e))
  }, [searchCountry])

  useEffect(() => {
    if (!isOneCountry) return
    setIsOneCountry(false)
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${
          import.meta.env.VITE_WEATHER_APi_KEY
        }&query=${countries[0].capital[0]}`
      )
      .then(({ data }) => {
        setWeather({
          name: data.location.name,
          temperature: data.current.temperature,
          img: data.current.weather_icons[0],
          wind: data.current.wind_speed,
          dir: data.current.wind_dir
        })
        console.log(weather)
      })
  }, [isOneCountry])

  // if (countries.length === 1) {
  //   setSearchCountry(countries[0].name.common)
  // }

  return (
    <div>
      <div>
        find countries{' '}
        <input type='text' value={searchCountry} onChange={setSearchValue} />
        {countries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {countries.length <= 10 && (
          <div style={{ marginTop: '1rem' }}>
            {countries.map((country) => {
              return (
                <div key={country.name.official}>
                  <span style={{ marginRight: '.3rem' }}>
                    {country.name.common}
                  </span>
                  <button onClick={showDetails} value={country.name.common}>
                    show
                  </button>
                </div>
              )
            })}
          </div>
        )}
        {countries.length === 1 && (
          <div key={countries[0].name.common}>
            <h2>{countries[0].name.common}</h2>
            <p>capital {countries[0].capital[0]}</p>
            <p>population {countries[0].population}</p>
            <h3>languages</h3>
            <ul>
              {Object.keys(countries[0].languages).map((keyName) => {
                console.log(keyName)
                return (
                  <li key={countries[0].name.common + keyName}>
                    {countries[0].languages[keyName]}
                  </li>
                )
              })}
            </ul>
            <img width='150rem' src={countries[0].flags.svg} />
            <h3>Weather in {weather.name}</h3>
            <b>temperature: </b>
            {weather.temperature} Celcius
            <div>
              <img src={weather.img} alt='' />
            </div>
            <b>wind: </b>
            {weather.wind} mph direction {weather.dir}
            {console.log(weather)}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
