import * as React from 'react';
import DatePicker from 'react-datepicker';
// import moment from 'moment'
import '../../../shared/react-datepicker-cssmodules.css';
import classNames from 'classnames/bind';

import styles from './Picker.css';

type Props = {
  selected: Date,
  dateFormat?: string,
  timeFormat?: string,
  minDate?: Date,
  maxDate?: Date,
  minTime?: Date,
  maxTime?: Date,
  showTimeSelect?: boolean,
  showTimeSelectOnly?: boolean,
  timeIntervals?: number,
  timeCaption?: string,
  handleChange: ?Function
}

let cx = classNames.bind(styles);

const Picker = (
  { selected,
    dateFormat,
    timeFormat,
    minDate,
    maxDate,
    minTime,
    maxTime,
    showTimeSelect,
    showTimeSelectOnly,
    timeIntervals,
    timeCaption,
    handleChange
  }: Props) => {

  let className = cx({
    'picker': true,
    'picker-time': showTimeSelectOnly
  });

  return (
    <DatePicker
      className={className}
      onChange={handleChange}
      selected={selected}
      dateFormat={dateFormat}
      timeFormat={timeFormat}
      minDate={minDate}
      maxDate={maxDate}
      minTime={minTime}
      maxTime={maxTime}
      showTimeSelect={showTimeSelect}
      showTimeSelectOnly={showTimeSelectOnly}
      timeIntervals={timeIntervals}
      timeCaption={timeCaption}
    />
  );
};

export default Picker;
