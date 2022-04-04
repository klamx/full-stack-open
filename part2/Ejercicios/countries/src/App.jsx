import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App () {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const setSearchValue = (e) => {
    e.preventDefault()
    setSearchCountry(e.target.value)
  }

  const showDetails = (e) => {
    // const index = countries.findIndex(
    //   (ele) => ele.name.common === e.target.value
    // )
    setSearchCountry(e.target.value)
  }

  useEffect(() => {
    if (searchCountry === '') return
    axios
      .get(`https://restcountries.com/v3.1/name/${searchCountry}`)
      .then(({ data }) => {
        console.log(data)
        setCountries(data)
      })
      .catch((e) => console.log(e))
  }, [searchCountry])

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
          </div>
        )}
      </div>
    </div>
  )
}

export default App
