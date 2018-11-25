//@flow

import * as React from 'react';

import Aux from '../../hoc/Aux/Aux';
import Workspace from '../../components/templates/Workspace/Workspace';
import TimerInput from '../../components/organisms/TimerInput/TimerInput';
import Output from '../../components/organisms/Output/Output';
import Modal from '../../components/organisms/Modal/Modal';
import ModalDivider from '../../components/molecules/ModalDivider/ModalDivider';

type Props = {
  history: Object
}

type State = {
  targetTime: Array<(string | number)>,
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

  isValid = (): boolean => {
    const pattern = /^[0-5]?[0-9]$/;
    return pattern.test(String(this.state.minutes)) && pattern.test(String(this.state.seconds));
  }

  handleStartClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const [ hours, minutes, seconds ] = [ this.state.hours, this.state.minutes, this.state.seconds ];
    if (this.isValid()) {
      const time = hours * 60 * 60 + minutes * 60 + seconds ;
      this.setState({ time, showTimer: true, isStarted: true },
        this.startTimer);
      this.setState({ targetTime: [hours, minutes, seconds] });
    }
  }

  startTimer = (): void => {
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

  getTime = (time: number): void => {
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor(time / 60) % 60;
    const seconds = time % 60 ;
    time -= 1;
    this.setState({ time, hours, minutes, seconds });
  }

  handlePauseContinueClick = (event: SyntheticMouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
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

  continueTimer = (): void => {
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

  handleHoursChange = (event: SyntheticInputEvent<HTMLInputElement> & { currentTarget: HTMLInputElement }): void => {
    event.preventDefault();
    this.setState({
      hours: +event.currentTarget.value
    });
  }

  handleMinutesChange = (event: SyntheticInputEvent<HTMLInputElement> & { currentTarget: HTMLInputElement }): void => {
    event.preventDefault();
    this.setState({
      minutes: +event.currentTarget.value
    });
  }

  handleSecondsChange = (event: SyntheticInputEvent<HTMLInputElement> & { currentTarget: HTMLInputElement }): void => {
    event.preventDefault();
    this.setState({
      seconds: +event.currentTarget.value
    });
  }

  handleStopClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
    event.preventDefault();
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

  handleToggleClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    this.setState({
      isStarted: false,
      showTimer: false
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
