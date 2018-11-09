import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Label.css';

type Props = {
  content: string,
  countdown?: boolean,
  timer?: boolean,
  upper?: boolean,
  lower?: boolean,
  counting?: boolean,
  unit?: boolean,
}

let cx = classNames.bind(styles);

const Label = (
  { content, countdown, timer, upper, lower, counting, unit, handleClick }: Props) => {

  let className = cx({
    label: true,
    'label-countdown': countdown,
    'label-timer': timer,
    'label-countdown-upper': countdown && upper,
    'label-timer-upper': timer && upper,
    'label-countdown-lower': countdown && lower,
    'label-timer-lower': timer && lower,
    'label-countdown-upper-counting': countdown && upper && counting,
    'label-countdown-lower-counting': countdown && lower && counting,
    'label-timer-lower-counting': timer && lower && counting,
    'label-unit': unit,
  });

  return (
    <span
      className={className}
      onClick={handleClick} >
      {content}
    </span>
  );
};

export default Label;
