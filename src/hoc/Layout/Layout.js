import * as React from 'react';

import Aux from '../Aux/Aux';

type Props = {
  children?: React.Node,
}

const layout = (props: Props) => {
  return (
    <Aux>
      <main>
        {props.children}
      </main>
    </Aux>
  )
}

export default layout;
