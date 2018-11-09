import * as React from 'react';

type Props = {
  children?: React.Node,
};

const aux = (props: Props) => props.children;

export default aux;
