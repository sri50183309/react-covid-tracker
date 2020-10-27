import React, { useEffect, useState } from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all' )
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    });
  }, []);

  //https://disease.sh/v3/covid-19/countries

  //useEffect  (hook, piece of code based on given condition)

  useEffect(() => {
    //The code inside here will run once when the component
    //loads and not again (because 2nd parameter of useEffect is empty, if it has variable then
    //it will be executed on change of )

    //async -> send a request, wait for it , do something
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }
    , []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
   

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
    `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

    await fetch(url)
    .then ((response) => response.json())
    .then ((data) => {
      setCountry(countryCode);

      //All of the data ...
      // from the country response
      setCountryInfo(data);

      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1> COVID-19 TRACKER </h1>

          <FormControl className="app__dropdown" >
          <Select variant="outlined" onChange={onCountryChange}  value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {
          countries.map(country => (
          <MenuItem value={country.value}>{country.name}</MenuItem>
          ))
          }
          </Select>
          </FormControl>
        </div>

        {/* Header */}

        {/* Title + Select input dropdown field */}

        <div className="app__stats">
          {/* Infoboxes */}
          <InfoBox
            isRed
            active= {casesType === "cases"}
            onClick={e => setCasesType('cases')}
            title="Coronovirus cases"
            cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
          {/* Infoboxes */}
          <InfoBox
            title="Recovered"  
            active= {casesType === "recovered"}
            onClick={e => setCasesType('recovered')}
            cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
          {/* Infoboxes */}
          <InfoBox
            title="Deaths"
            isRed
            active= {casesType === "deaths"}
            onClick={e => setCasesType('deaths')}
            cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
          {/* Table */}
          {/* Graph */}

        </div>

        {/* Map */}
        <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}/>          
      </div>
      <Card className="app__right">
      <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide {casesType}</h3>
            <LineGraph className="graph" casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>  

  );
}

export default App;