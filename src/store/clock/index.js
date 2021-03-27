import { observable, computed, action } from "mobx";
import moment from 'moment-timezone';

class Clock {
  @observable 
  timeZone = 'Asia/Chongqing';

  @observable
  currentTime = moment().tz('Asia/Chongqing');

  @computed
  get currentMoment () {
    // return this.currentTime.format('k kk');
    return this.currentTime.format();
  }

  @computed
  get currentHour () {
    const currentHour = this.currentTime.toArray()[3]
    const currentMinute = this.currentTime.toArray()[4]
    return (currentHour % 12 + currentMinute / 60) * (360 / 12);
  }

  @computed
  get currentMinute () {
    const currentMinute = this.currentTime.toArray()[4];
    const currentSecond = this.currentTime.toArray()[5];
    return (currentMinute + currentSecond / 60 ) * (360 / 60);
  }

  @computed
  get currentSecond () {
    const currentSecond = this.currentTime.toArray()[5];
    return currentSecond * (360 / 60);
  }


  @action 
  updateTimeZone = (newTimeZone) => {
    // 更改数据
    this.timeZone = newTimeZone;
  }

  @action
  updateCurrentTime = () => {
    this.currentTime = moment().tz(this.timeZone);
  }
}

export default new Clock();