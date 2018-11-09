import * as React from 'react';

import classNames from 'classnames/bind';
import styles from './Output.css';
import Aux from '../../../hoc/Aux/Aux';
import TimeValueBox from '../../molecules/TimeValueBox/TimeValueBox';
import Button from '../../atoms/Button/Button';
import { leading0 } from '../../../shared/utility'

let cx = classNames.bind(styles);

type Props = {
  countdown?: boolean,
  timer?: boolean,
  days?: number,
  hours: number,
  minutes: number,
  seconds: number,
  time?: number;
  isStarted?: boolean,
}

const Output = (
{ countdown, timer, handleClick, days, hours, minutes, seconds, time, isStarted }: Props) => {

  let className = cx({
    'output': true,
  });

  let buttonContent = isStarted ? 'Pause' : 'Start';
  let output;
  if (countdown) {
    output = (
      <div className={className}>
        <TimeValueBox countdown value={leading0(days)} unit='days' />
        <TimeValueBox countdown value={leading0(hours)} unit='hours' />
        <TimeValueBox countdown value={leading0(minutes)} unit='minutes' />
        <TimeValueBox countdown value={leading0(seconds)} unit='seconds'/>
      </div>

    )
  } else {
    output = (
      <div className={className}>
        <TimeValueBox timer value={leading0(hours)} unit='hours' />
        <TimeValueBox timer value={leading0(minutes)} unit='minutes' />
        <TimeValueBox timer value={leading0(seconds)} unit='seconds' />
        <Button
          hide={!~time}
          countdown={countdown}
          timer={timer}
          content={buttonContent}
          handleClick={handleClick} />
      </div>
    )
  }

  return (
    <Aux>
      {output}
    </Aux>
  );
}

export default Output;
