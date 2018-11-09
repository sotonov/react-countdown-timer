import * as React from 'react';
import { Redirect } from 'react-router-dom';

import Title from '../../atoms/Title/Title';
import Button from '../../atoms/Button/Button';
import Aux from '../../../hoc/Aux/Aux';

type Props = {

};

type State = {
  app: string
};

class Home extends React.Component<Props, State> {
  state = {
    app: ''
  }

  handleClick = (e) => {
    this.setState({
      app: e.target.innerText
    })
  }

  render () {
    let redirectToApp;
    if (this.state.app) {
      redirectToApp = <Redirect to={`/${this.state.app}`} />;
    }

    let title = 'Select the App';

    return (
      <Aux>
        {redirectToApp}
          <Title
          home
          content={title} />
        <Button
          home
          content='Countdown'
          handleClick={this.handleClick} />
        <Button
          home
          content='Timer'
          handleClick={this.handleClick} />
      </Aux>
    );
  }
}

export default Home;
