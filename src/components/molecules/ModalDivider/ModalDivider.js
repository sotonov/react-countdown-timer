import * as React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Title from '../../atoms/Title/Title';

type Props = {
  title: string,
  text: string,
  countdown?: boolean,
  timer?: boolean,
}

const ModalDivider = (
  { title, content, countdown, timer, handleClick }: Props) => {

  return (
    <Aux onClick={handleClick}>
      <Title content={title} countdown={countdown} timer={timer} />
      <p>{content}</p>
    </Aux>
  );
}

export default ModalDivider;
