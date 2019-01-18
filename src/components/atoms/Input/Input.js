import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Input.css';

type Props = {
  unit: string,
  value?: string | number,
  handleChange: ?(event: SyntheticInputEvent<HTMLInputElement>) => void
}

let cx = classNames.bind(styles);

const Input = (
  { unit, value, handleChange }: Props) => {

  let className = cx({
    input: true,
    ['input-' + unit]: true,
  });

  let maxLength = 2;
  let pattern;
  switch (unit) {
    case 'hours':
      pattern = "[0-9]+";
      break;
    case 'minutes':
      pattern = "^[0-5]?[0-9]$"
      break;
    case 'seconds':
      pattern = "^[0-5]?[0-9]$";
      break;
    default:
      pattern = "^[0-5]?[0-9]$";
  }

  return (
    <input
      className={className}
      type='text'
      maxLength={maxLength}
      pattern={pattern}
      onChange={handleChange}
    />
  );
};

export default Input;
