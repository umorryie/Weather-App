import React, { Component } from "react";
import "./Prvastran.css";
import Slika from "./Slika.js";
import { render } from "react-dom";
import styled from "styled-components";
import {
  Tween,
  Timeline,
  SplitWords,
  SplitLetters,
  Controls,
} from "react-gsap";
class Prvastran extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "", info: [] };
  }

  onSubmitClick = (e) => {
    e.preventDefault();
    if (this.state.input === "") {
      {
        alert("You did not put in anything ... Try again ...");
      }
      return;
    }
    const input = this.state.input;

    const url2 = `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=485443acbddc413c9d9fc08817c4cb27`;
    fetch(url2)
      .then((res) => res.json())
      .then((data) => {
        const podatki = data.results[0].geometry;
        const { lat, lng } = podatki;
        console.log(lat, lng);
        const url = `http://api.weatherstack.com/current?access_key=fbea25e82718e318bcafba5d0cd02c89&query=${lat},${lng}&units=m`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const { location, current } = data;
            console.log(location);
            let issDay = true;
            if (current.is_day === "no") {
              issDay = false;
            }
            const Objekt = {
              temp: current.temperature,
              lgn: location.lon,
              lat: location.lat,
              windSpeed: current.wind_speed,
              rainPosibility: current.precip,
              isDay: issDay,
            };
            this.setState({ info: [Objekt] });
            console.log(this.state.info);
          });
      })
      .catch(console.log);
  };
  onEventClick = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value.trim() });
  };
  componentDidMount = () => {
    let Slike = undefined;
    if (this.state.info === []) {
      Slike = "ni undefined";
    }
    const jaz = "asd";
    console.log("Slike", jaz);
    console.log(Slike);
  };
  render() {
    const Slike = this.state.info.map(
      ({ lat, lgn, temp, windSpeed, rainPosibility, isDay }, i) => {
        return (
          <Slika
            key={i}
            kei={i}
            lat={lat}
            lng={lgn}
            temp={temp}
            windSpeed={windSpeed}
            rainPosibility={rainPosibility}
            isDay={isDay}
          />
        );
      }
    );
    return (
      <div className="containter-Novi">
        <div className="containter">
          <Timeline
            target={
              <SplitWords>
                <h1>ALL ABOUT WEATHER</h1>
              </SplitWords>
            }
          >
            <Tween
              from={{ x: "-500px" }}
              to={{ x: "0px" }}
              duration={3}
              ease="Elastic.easeOut"
              delay={0}
            />
          </Timeline>

          {/* 
            
          <Tween x={300} opacity={0} duration={1}>
            <h1>
              Every thing you want to know about weather in worldwide cities
            </h1>
           </Tween>*/}
        </div>
        <div className="prestavimoTole">
          <form onSubmit={this.onSubmitClick}>
            <Tween x={-300} opacity={0} duration={1}>
              <div className="containter">
                <input
                  onChange={this.onEventClick}
                  type="text"
                  name="input"
                  id="input"
                  className="input"
                  value={this.state.input}
                  placeholder="Vnesi mesto..."
                />
              </div>
            </Tween>
            <Tween y={200} opacity={0} duration={1}>
              <div className="containter">
                <button className="gumb">Check weather</button>
              </div>
            </Tween>
          </form>

          <div className="containter slika">{Slike}</div>
        </div>
      </div>
    );
  }
}

export default Prvastran;
