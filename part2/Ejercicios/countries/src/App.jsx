import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App () {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const setSearchValue = (e) => {
    e.preventDefault()
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
          <ul>
            {countries.map((country) => {
              return <li key={country.name.official}>{country.name.common}</li>
            })}
          </ul>
        )}
        {countries.length === 1 && (
          <div key={countries[0].name.common}>
            <h2>{countries[0].name.common}</h2>
            <p>capital {countries[0].capital[0]}</p>
            <p>population {countries[0].population}</p>
            <h3>languages</h3>
            {/* {countries[0].languages.map((lan) => {
              console.log(lan)
              return <p key={countries[0].name + '1'}>hola</p>
            })} */}
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
