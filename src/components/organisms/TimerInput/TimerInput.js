import * as React from 'react';

import classNames from 'classnames/bind';
import styles from './TimerInput.css';
import TimeValueBox from '../../molecules/TimeValueBox/TimeValueBox';
import Button from '../../atoms/Button/Button';

let cx = classNames.bind(styles);

type Props = {
  showTimer?: boolean,
}

const TimerInput = (
  { targetTime, handleHoursChange, handleMinutesChange, handleSecondsChange, handleClick }: Props) => {

  const buttonContent = "Start";

  let className = cx({
    'timer-input': true,
  });

  return (
    <form
      className={className}
      onSubmit={handleClick}>
      <TimeValueBox
        timer
        unit='hours'
        handleChange={handleHoursChange} />
      <TimeValueBox
        timer
        unit='minutes'
        handleChange={handleMinutesChange} />
      <TimeValueBox
        timer
        unit='seconds'
        handleChange={handleSecondsChange} />
      <Button
        timer
        content={buttonContent}
        handleClick={handleClick} />
    </form>
  );
}

export default TimerInput;
