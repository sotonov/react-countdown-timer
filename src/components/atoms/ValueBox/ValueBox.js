import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './ValueBox.css';

type Props = {
  value: number,
}

let cx = classNames.bind(styles);

const ValueBox = (
  { value }: Props) => {

  let className = cx({
    'value-box': true,
  });

  return (
    <span className={className}>{value}</span>
  );
};

export default ValueBox;
