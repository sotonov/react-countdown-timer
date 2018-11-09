import * as React from 'react';

import classNames from 'classnames/bind';
import styles from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../molecules/Backdrop/Backdrop';

let cx = classNames.bind(styles);

type Props = {
  show: boolean,
  children?: React.Node,
}

const Modal = (
  { show, handleClick, handleModalClick, children }: Props) => {

  let className = cx({
    'modal': true,
  });

  return  (
    <Aux>
      <Backdrop show={show} handleClick={handleClick}/>
      <div
        className={className}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0'
        }}
        onClick={handleModalClick}>
        {children}
      </div>
    </Aux>
  )
}

export default Modal;
