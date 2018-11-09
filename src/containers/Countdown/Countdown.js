import * as React from 'react';
import moment from 'moment';
import Workspace from '../../components/templates/Workspace/Workspace';
import CountdownInput from '../../components/organisms/CountdownInput/CountdownInput';
import Output from '../../components/organisms/Output/Output';
import Modal from '../../components/organisms/Modal/Modal';
import ModalDivider from '../../components/molecules/ModalDivider/ModalDivider';

type State = {
  targetDate: moment,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  isRunning: boolean,
  showModal: boolean,
};

class Countdown extends React.Component<Props, State>  {
  state = {
    targetDate: null,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRunning: false,
    showModal: false
  }

  componentDidMount () {
    this.setState({
      targetDate: moment()
    });
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.isRunning === false && nextState.isRunning === true) {
      return (
        nextState.seconds !== this.state.seconds
        || nextState.minutes !== this.state.minutes
        || nextState.hours !== this.state.hours
        || nextState.days !== this.state.days
      )
    }
    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const target = new Date(this.state.targetDate);
    this.setState(prevState => {
      return { isRunning: !prevState.isRunning }
    });
    let getNewTimeUntil = setInterval(() => {
      const time = target - new Date();
      if (time > 0 && this.state.isRunning) {
        this.getTimeUntil(time);
      } else {
        if (time < 0) {
          this.setState({
            showModal: true
          })
        }
        clearInterval(getNewTimeUntil);
      }
    }, 1000);
  }

  getTimeUntil = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor(time / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const seconds = Math.floor(time / 1000) % 60 ;
    this.setState({ seconds, minutes, hours, days })
  }

  handleChange = (targetDate) => {
    targetDate = targetDate.set({second:0, millisecond:0});
    this.setState({
      targetDate,
      isRunning: false
    });
  }

  handleStopClick = (e) => {
    e.preventDefault();
    this.setState(prevState => {
      return {
        targetDate: moment(),
        isRunning: !prevState.isRunning
      }
    })
  }

  handleToggleClick = (e) => {
    e.preventDefault();
    this.setState({
      isRunning: false
    }, () => setTimeout(this.props.history.replace('/timer'), 1000) )
  }

  handleModalClick = (e) => {
    e.preventDefault();
    this.setState({
      targetDate: moment(),
      showModal: false,
      isRunning: false
    })
  }

  render () {

    let countdown;

    if (!this.state.isRunning && this.state.targetDate) {
      countdown = (
        <CountdownInput
          handleDateChange={this.handleChange}
          handleTimeChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          targetDate={this.state.targetDate} />
      );
    } else {
      countdown = (
        <Output
          countdown
          {...this.state}
          handleClick={this.handlePauseContinueClick} />
      );
    }

    const endingInfo = `The countdown ended on ${(new Date(this.state.targetDate)).toLocaleString('sr-sr').slice(0,-3)} h. Select another date.`;
    const endingTitle = 'Countdown Info';
    let modal = null;

    if (this.state.showModal) {
      modal = (
        <Modal
          show
          handleModalClick={this.handleModalClick}>
          <ModalDivider
            title={endingTitle}
            content={endingInfo} />
        </Modal>
      )
    }

    return (
      <div>
        {modal}
        <Workspace
          countdown
          {...this.state}
          handleToggleClick={this.handleToggleClick}
          handleStopClick={this.handleStopClick}>
          {countdown}
        </Workspace>
      </div>
    )
  }
}

export default Countdown;
