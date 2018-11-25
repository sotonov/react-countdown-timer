import * as React from 'react';
import moment from 'moment';

import classNames from 'classnames/bind';
import styles from './CountdownInput.css';
import DatePicker from '../../molecules/DatePicker/DatePicker';
import TimePicker from '../../molecules/TimePicker/TimePicker';
import Button from '../../atoms/Button/Button';

let cx = classNames.bind(styles);

type Props = {
  targetDate: moment,
  handleDateChange?: ?Function,
  handleTimeChange?: ?Function,
  handleSubmit?: ?Function
}

const CountdownInput = (
  { targetDate, handleDateChange, handleTimeChange, handleSubmit }: Props) => {

    const buttonContent = "Start";

    let className = cx({
      'countdown-input': true,
    });

  return (
    <form
      className={className}
      onSubmit={handleSubmit} >
      <DatePicker
        selected={targetDate}
        handleChange={handleDateChange} />
      <TimePicker
        selected={targetDate}
        handleChange={handleTimeChange} />
      <Button
        countdown
        type='submit'
        content={buttonContent} />
    </form>
  );
}

export default CountdownInput;
