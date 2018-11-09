import * as React from 'react';

import classNames from 'classnames/bind';
import styles from './TimeValueBox.css';
import ValueBox from '../../atoms/ValueBox/ValueBox';
import Input from '../../atoms/Input/Input';
import Label from '../../atoms/Label/Label';

let cx = classNames.bind(styles);

type Props = {
  value?: number,
  unit: string,
  countdown?: boolean,
  timer?: boolean,
}

const TimeValueBox = (
  { value, unit, timer, countdown, handleChange }: Props) => {

    let className = cx({
      'time-value-box': true,
      ['time-value-box-' + unit]: true,
      ['time-value-box-' + unit + '-countdown']: unit === 'hours' && countdown,
    });

    let upperSpan;
    if (value) {
      upperSpan = <ValueBox value={value} />;
    } else {
      upperSpan = <Input unit={unit} handleChange={handleChange} />;
    }

    let lowerSpan = <Label content={unit} unit />


  return (
    <div className={className}>
      {upperSpan}
      {lowerSpan}
    </div>
  );
}

export default TimeValueBox;
