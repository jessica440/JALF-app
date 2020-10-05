import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import './Profile.css';

import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
highchartsMore(Highcharts);

const checkResponse = (response) => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response.json();
};

const getData = (url) => {
  return fetch(url)
    .then(checkResponse)
    .catch((err) => {
      throw new Error(`fetch getUserData failed ${err}`);
    });
};

export default function Profile({ setPage, navigate }) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getData('http://localhost:3000/api/user/5f7b3daa99c0a30649607b10').then((res) => {
      console.log(res);
      const glucose = res.data.glucose_reading;
      const time = res.data.time;
      const dataTimeArray = [];
      for (let i = 0; i < time.length; i++) {
        dataTimeArray.push([time[i], glucose[i]]); // why does data[0][0] come back undefined?
      }
      console.log(dataTimeArray);
      setData(dataTimeArray);
    });
  }, []);

  const options = {
    chart: {
      type: 'spline',
      scrollablePlotArea: {
        minWidth: 1000,
        scrollPositionX: 1,
      },
    },
    title: {
      text: 'Blood Glucose Level',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify',
      },
    },
    yAxis: {
      title: {
        text: 'BGL (mmol/mL)',
      },
    },

    series: [
      {
        name: 'Blood Glucose Level',
        data: data,
      },
      {
        name: 'Safe Range',
        data: [
          [5, 7],
          [5, 7],
        ],
        type: 'arearange',
        lineWidth: 0,
        color: Highcharts.getOptions().colors[2],
        fillOpacity: 0.3,
        zIndex: 0,
        marker: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <>
      <h1>My Profile</h1>
      <h2>{typeof data[0]}</h2>
      <figure class='highcharts-figure'>
        <div id='container'>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </figure>
    </>
  );
}
