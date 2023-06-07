import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line } from 'react-chartjs-2';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [worldData, setWorldData] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    fetchData();
    fetchGraphData();
    fetchCountryData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://disease.sh/v3/covid-19/all');
      setWorldData(response.data);
    } catch (error) {
      console.error('Error fetching worldwide data:', error);
    }
  };

  const fetchGraphData = async () => {
    try {
      const response = await axios.get(
        'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
      );
      setGraphData(response.data);
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  const fetchCountryData = async () => {
    try {
      const response = await axios.get(
        'https://disease.sh/v3/covid-19/countries'
      );
      setCountryData(response.data);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  const renderGraph = () => {
    if (!graphData) {
      return null;
    }

    const casesData = graphData.cases;
    const dates = Object.keys(casesData);
    const cases = Object.values(casesData);

    const chartData = {
      labels: dates,
      datasets: [
        {
          label: 'Cases',
          data: cases,
          fill: false,
          borderColor: '#007BFF',
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MMM D',
            },
            tooltipFormat: 'll',
          },
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cases',
          },
        },
      },
    };

    return <Line data={chartData} options={chartOptions} />;
  };

  const renderMap = () => {
    if (!countryData.length) {
      return null;
    }

    return (
      <MapContainer style={{ height: '400px', width: '100%' }} center={[0, 0]} zoom={2}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
        />
        {countryData.map((country) => (
          <Marker key={country.country} position={[country.countryInfo.lat, country.countryInfo.long]}>
            <Popup>
              <div>
                <h4>{country.country}</h4>
                <p>Total Active Cases: {country.active}</p>
                <p>Total Recovered Cases: {country.recovered}</p>
                <p>Total Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  };

  return (
    <div>
      <h1>COVID-19 Dashboard</h1>
      <h2>Worldwide Cases</h2>
      {worldData && (
        <div>
          <p>Total Cases: {worldData.cases}</p>
          <p>Total Deaths: {worldData.deaths}</p>
          <p>Total Recovered: {worldData.recovered}</p>
          <p>Total Active Cases: {worldData.active}</p>
        </div>
      )}

      
      <h2>Graph: Cases Over Time</h2>
      {renderGraph()}
      <h2>Country-wise Cases</h2>
      {renderMap()}
    </div>
  );
};

export default App;
