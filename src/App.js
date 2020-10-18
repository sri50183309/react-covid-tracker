import React, { useEffect, useState } from 'react';
import './App.css';
import {FormControl,Select,MenuItem} from "@material-ui/core";
function App() {

  const [countries, setCountries] = useState([]);

  //https://disease.sh/v3/covid-19/countries

  //useEffect  (hook, piece of code based on given condition)

  useEffect(() => {
      //The code inside here will run once when the component
      //loads and not again (because 2nd parameter of useEffect is empty, if it has variable then
      //it will be executed on change of )
      
      //async -> send a request, wait for it , do something
      const getCountriesData = async () => {
        await fetch  ("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
          setCountries(countries);
        });
      };
      getCountriesData();
    }
  ,[]);
  return (
    <div className="App">
      <div className="app__header">
        <h1> COVID-19 TRACKER </h1>

        <FormControl className="app__dropdown" >
        <Select
            variant="outlined"
            value="abc"
          >

          {
            countries.map(country => (
            <MenuItem  value={country.value}>{country.name}</MenuItem>  
            ))
          }
          </Select>
        </FormControl>

      </div>

      {/* Header */}

      {/* Title + Select input dropdown field */}

      {/* Infoboxes */}
      {/* Infoboxes */}
      {/* Infoboxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
