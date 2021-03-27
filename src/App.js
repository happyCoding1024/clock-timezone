import React, { Component } from 'react';
import {inject,observer} from "mobx-react";
import moment from 'moment-timezone';
import './App.css';

@inject("store")
@observer
class App extends Component {

  constructor (props) {
    super(props);
    this.handleTimeZoneChange = this.handleTimeZoneChange.bind(this);
    moment.tz.setDefault("Asia/Chongqing");
    moment.locale('zh-cn');
  }

  render() {
    const { store } = this.props;
    const arr = [9, 10, 11, 12 , 1, 2, 3, 4, 5, 6, 7, 8];
    return (
      <div id='warp'>
        <div id="currentMoment">{store.clock.currentMoment}</div>
        <div id="clock">
          <div id="number">
            {arr.map((item, index) =>
              <div style={{transform: 'rotate('+ index*30 +'deg)'}} key={index}>
                <span style={{transform: 'rotate('+ index*(-30) +'deg)'}} key={index}>{item}</span>
              </div>
            )}
          </div>
          <span id="hour" className="pointer" style={{transform:'rotate('+ store.clock.currentHour +'deg)', transition: 'all 2s'}}/>
          <span id="minute" className="pointer" style={{transform:'rotate('+ store.clock.currentMinute +'deg)', transition: 'all 2s'}}/>
          <span id="second" className="pointer" style={{transform:'rotate('+ store.clock.currentSecond +'deg)'}}/>
        </div>
        <label htmlFor="timeZone-select">时区选择</label>
        <select 
          name="timeZone" 
          id="timeZone-select" 
          onChange={this.handleTimeZoneChange}
        >
          { moment.tz.names().map((item, index) => 
            item === 'Asia/Chongqing' ? 
              <option value={item} key={index} selected="selected">{item}</option> 
            :
              <option value={item} key={index}>{item}</option>
          )}
        </select>
      </div>
    );
  }

  componentDidMount () {
    setInterval(() => {
      this.props.store.clock.updateCurrentTime();
    }, 1000);
  }

  handleTimeZoneChange (e) {
    const selectedTimeZone = e.target.value;
    this.props.store.clock.updateTimeZone(selectedTimeZone);
  }
}

export default App;
