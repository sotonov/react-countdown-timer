import * as React from 'react';
import moment from 'moment';

import Aux from '../../../hoc/Aux/Aux';
import Title from '../../atoms/Title/Title';
import Label from '../../atoms/Label/Label';
import Button from '../../atoms/Button/Button';

type Props = {
  countdown?: boolean,
  timer?: boolean,
  targetDate?: moment,
  days?: number,
  hours: number,
  minutes: number,
  seconds: number,
  isRunning?: boolean,
  targetTime?: Array,
  showTimer?: boolean,
  isStarted?: boolean,
  children?: any
}

const Workspace = (
  { countdown,
    timer,
    targetDate,
    days,
    hours,
    minutes,
    seconds,
    isRunning,
    handleChange,
    handleToggleClick,
    handleStopClick,
    handleHoursChange,
    handleMinutesChange,
    handleSecondsChange,
    handleStartClick,
    handleSubmit,
    handlePauseContinueClick,
    targetTime,
    showTimer,
    isStarted,
    children }: Props) => {

    const titleContent = countdown ? 'Countdown' : 'Timer';

    let upperLabel, lowerLabel;
    if (countdown) {
      if (!isRunning) {
        upperLabel = 'Select Date and Time';
      } else {
        const target = (new Date(targetDate)).toLocaleString('sr-sr').slice(0,-3);
        upperLabel = 'Time until ' + target + '.';
        lowerLabel = 'Select another date?';
      }
    } else {
      if (!showTimer) {
        upperLabel = 'Select Time Interval';
      } else {
        upperLabel = 'Timer Interval: ' + targetTime[0] + ' h ' + targetTime[1]
        + ' min ' + targetTime[2] + ' s';
        lowerLabel = 'Choose another time interval?';
      }
    }

    const toggleButtonContent = countdown
    ? 'Wanna Try the Timer?'
    : 'Wanna Try the Countdown?';

    return (
      <Aux>
        <Title
          content={titleContent}
          countdown={countdown}
          timer={timer} />
        <Label
          content={upperLabel}
          countdown={countdown}
          timer={timer}
          upper
          counting={isRunning || showTimer} />
        {children}
        <Label
          content={lowerLabel}
          countdown={countdown}
          timer={timer}
          lower
          counting={isRunning || showTimer}
          handleClick={handleStopClick} />
        <Button
          type='button'
          handleClick={handleToggleClick}
          content={toggleButtonContent}
          toggle />
      </Aux>
    )
}

export default Workspace;
