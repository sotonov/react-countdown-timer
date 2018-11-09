import * as React from 'react';

import Aux from '../../hoc/Aux/Aux';
import Workspace from '../../components/templates/Workspace/Workspace';
import TimerInput from '../../components/organisms/TimerInput/TimerInput';
import Output from '../../components/organisms/Output/Output';
import Modal from '../../components/organisms/Modal/Modal';
import ModalDivider from '../../components/molecules/ModalDivider/ModalDivider';

type State = {
  targetTime: object<Array>,
  time: number,
  hours: number,
  minutes: number,
  seconds: number,
  showTimer: boolean,
  isStarted: boolean,
};

class Timer extends React.Component<Props, State> {
  state = {
    targetTime: ['', '', ''],
    time: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    showTimer: false,
    isStarted: false,
  }

  handleStartClick = (e) => {
    e.preventDefault();
    const [ hours, minutes, seconds ] = [ this.state.hours, this.state.minutes, this.state.seconds ];
    let isValid = true;
    const pattern = /^[0-5]?[0-9]$/;
    isValid = pattern.test(minutes) && pattern.test(this.state.seconds) && isValid;
    if (isValid) {
      const time = hours * 60 * 60 + minutes * 60 + seconds ;
      this.setState({ time, showTimer: true, isStarted: true },
        this.startTimer);
      this.setState({ targetTime: [hours, minutes, seconds] });
    }
  }

  startTimer = () => {
    if (this.state.time >= 0 && this.state.isStarted) {
      this.getTime(this.state.time);
    }
    let refreshTimer = setInterval(() => {
      if (this.state.time >= 0 && this.state.isStarted) {
        this.getTime(this.state.time);
      } else {
        clearInterval(refreshTimer);
      }
    }, 1000);
  }

  getTime = (time) => {
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor(time / 60) % 60;
    const seconds = time % 60 ;
    time -= 1;
    this.setState({ time, hours, minutes, seconds });
  }

  handlePauseContinueClick = (e) => {
    e.preventDefault();
    let hours, minutes, seconds;
    if (this.state.isStarted) {
      this.setState(prevState => {
        return {
          isStarted: !prevState.isStarted
        }
      })
    } else {
      [ hours, minutes, seconds ] = [ this.state.hours, this.state.minutes, this.state.seconds ];
      const time = hours * 60 * 60 + minutes * 60 + seconds ;
      this.setState({ time, hours, minutes, seconds, isStarted: true}, this.continueTimer);
    }
  }

  continueTimer = () => {
    if (this.state.time >= 0 && this.state.isStarted) {
      this.getTime(this.state.time);
    }
    let refreshTimer = setInterval(() => {
      if (this.state.time >= 0 && this.state.isStarted) {
        this.getTime(this.state.time);
      } else {
        clearInterval(refreshTimer);
      }
    }, 1000);
  }

  handleHoursChange = (e) => {
    e.preventDefault();
    this.setState({
      hours: +e.target.value
    });
  }

  handleMinutesChange = (e) => {
    e.preventDefault();
    this.setState({
      minutes: +e.target.value
    });
  }

  handleSecondsChange = (e) => {
    e.preventDefault();
    this.setState({
      seconds: +e.target.value
    });
  }

  handleStopClick = (e) => {
    e.preventDefault();
    this.setState(prevState => {
      return {
        targetTime: ['', '', ''],
        time: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isStarted: !prevState.isStarted,
        showTimer: !prevState.showTimer
      }
    })
  }

  handleToggleClick = (e) => {
    e.preventDefault();
    this.setState({
      isRunning: false
    }, () => setTimeout(this.props.history.replace('/countdown'), 1000) )
  }

  render () {

    let timer;

    if (!this.state.showTimer) {
      timer = (
        <TimerInput
          handleHoursChange={this.handleHoursChange}
          handleMinutesChange={this.handleMinutesChange}
          handleSecondsChange={this.handleSecondsChange}
          handleClick={this.handleStartClick}
          showTimer={this.state.showTimer} />
      );
    } else {
      timer = (
        <Output
          timer
          {...this.state}
          handleClick={this.handlePauseContinueClick} />
      );
    }

    const endingInfo = `The timer ended on ${(new Date()).toLocaleString('sr-sr').slice(0,-3)} h. Select another time interval.`;
    const endingTitle = 'Timer Info';

    let modal = null;

    if (this.state.time < 0) {
      modal = (
        <Modal
          show
          handleModalClick={this.handleStopClick}>
          <ModalDivider
            title={endingTitle}
            content={endingInfo} />
        </Modal>
      )
    }

    return (
      <Aux>
      {modal}
        <Workspace
          timer
          {...this.state}
          handleToggleClick={this.handleToggleClick}
          handleStopClick={this.handleStopClick}>
          {timer}
        </Workspace>
      </Aux>
    )
  }
}

export default Timer;
