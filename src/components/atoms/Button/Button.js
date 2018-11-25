import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Button.css';

type Props = {
  content: string,
  home?: boolean,
  countdown?: boolean,
  timer?: boolean,
  toggle?: boolean,
  hide?: boolean,
  handleClick?: ?Function
}

let cx = classNames.bind(styles);

const Button = (
  { content, hide, home, countdown, timer, toggle, handleClick }: Props) => {

  let className = cx({
    button: true,
    'button-toggle': toggle,
    'button-countdown': countdown,
    'button-timer': timer,
    'button-home': home,
    'button-timer-hidden': timer && hide
  })

  return (
    <button
      className={className}
      onClick={handleClick}>
      {content}
    </button>
  );
};

export default Button;
