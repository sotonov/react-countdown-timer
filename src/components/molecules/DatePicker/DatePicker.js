import * as React from 'react';
import moment from 'moment';

import classNames from 'classnames/bind';
import styles from './DatePicker.css';
import Picker from '../../atoms/Picker/Picker';

let cx = classNames.bind(styles);

type Props = {
  selected: Date,
}

const DatePicker = (
  { selected, handleChange }: Props) => {

  const dateFormat = "DD/MM/YYYY";
  const minDate = moment();
  selected = moment(selected);

  let className = cx({
    'date-picker': true,
  });

  return (
    <div className={className}>
      <Picker
        selected={selected}
        handleChange={handleChange}
        dateFormat={dateFormat}
        minDate={minDate}
      />
    </div>
  );
}

export default DatePicker;
