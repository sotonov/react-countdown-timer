import * as React from 'react';
import moment from 'moment';

import classNames from 'classnames/bind';
import styles from './TimePicker.css';
import Picker from '../../atoms/Picker/Picker';

let cx = classNames.bind(styles);

type Props = {
  selected: moment,
}

const TimePicker = (
  { selected, handleChange }: Props) => {


  const dayStart = moment().set({hour:0, minute:0, second:0, millisecond:0});
  selected = moment(selected);
  const dateFormat = "LT";
  const timeFormat = "HH:mm";
  const timeIntervals = 10;
  const timeCaption = 'Time';
  const minTime = moment().isSame(selected, 'days') ? moment() : dayStart;
  const maxTime = moment().set({hour:23, minute:59, second:59, millisecond:999});

  let className = cx({
    'time-picker': true,
  });

  return (
    <div className={className}>
      <Picker
        selected={selected}
        handleChange={handleChange}
        showTimeSelect
        showTimeSelectOnly
        timeFormat={timeFormat}
        timeIntervals={timeIntervals}
        dateFormat={dateFormat}
        timeCaption={timeCaption}
        minTime={minTime}
        maxTime={maxTime}
        />
    </div>
  );
}

export default TimePicker;
