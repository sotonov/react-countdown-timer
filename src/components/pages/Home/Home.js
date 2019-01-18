import * as React from 'react';
import { Redirect } from 'react-router-dom';

import Title from '../../atoms/Title/Title';
import Button from '../../atoms/Button/Button';
import Aux from '../../../hoc/Aux/Aux';
import * as cst from '../../../constants/constants';


type State = {
  app: string
};

class Home extends React.Component<{}, State> {
  state = {
    app: ''
  }

  handleClick = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    this.setState({
      app: event.currentTarget.innerText
    })
  }

  render () {
    let redirectToApp;
    if (this.state.app) {
      redirectToApp = <Redirect to={`/${this.state.app}`} />;
    }

    let title = cst.HOME_TITLE;

    return (
      <Aux>
        {redirectToApp}
          <Title
          home
          content={title} />
        <Button
          home
          content={cst.COUNTDOWN}
          handleClick={this.handleClick} />
        <Button
          home
          content={cst.TIMER}
          handleClick={this.handleClick} />
      </Aux>
    );
  }
}

export default Home;
