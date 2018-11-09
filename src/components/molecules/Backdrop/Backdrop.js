import * as React from 'react';

import classNames from 'classnames/bind';
import styles from './Backdrop.css';

let cx = classNames.bind(styles);

type Props = {
  show: boolean
}

const backdrop = (
  { show, handleClick }: Props) => {

  let className = cx({
    'backdrop': true,
  });
  return (
    show ? <div className={className} onClick={handleClick}></div> : null
  );
}

export default backdrop;
