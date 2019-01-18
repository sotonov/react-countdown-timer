import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './Title.css';

type Props = {
  content: string,
  timer?: boolean,
  countdown?: boolean,
  home?: boolean
}

let cx = classNames.bind(styles);

const Title = (
  { content, timer, countdown, home }: Props) => {

  let className = cx({
    title: true,
    'title-app': timer || countdown,
    'title-home': home,
  });

  return (
    <h1 className={className}>{content}</h1>
  );
};

export default Title;
