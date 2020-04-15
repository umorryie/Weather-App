import React, { Component } from "react";
import sonce from "../img/sonce.gif";
import clouds from "../img/clouds.gif";
import loading from "../img/loading.gif";
import night from "../img/night.gif";
import rain from "../img/rain.gif";
import thunder from "../img/thunder.gif";
const Slika = ({ lng, lat, kei, temp, windSpeed, rainPosibility, isDay }) => {
  let slika = sonce;
  if (!isDay) {
    slika = night;
  } else if (rainPosibility > 0.5 && rainPosibility < 1) {
    slika = rain;
  } else if (rainPosibility > 1) {
    slika = thunder;
  }

  return (
    <div key={kei} className="box">
      <div className="kjerSLika">
        {<img className="slikca" src={slika} alt="" />}
      </div>

      <div className="pozicijaTexta">
        <div className=" vsebina">
          <div className="pozicija">
            <div className="latitude vseb">Latitude: {lat}</div>
            <div className="longitude vseb"> Longitude: {lng}</div>
          </div>
          <div className="temperature vseb">Temperature: {temp} Celzius</div>
          <div className="windspeed vseb">Wind speed: {windSpeed} km/h</div>
        </div>
      </div>
    </div>
  );
};

export default Slika;
