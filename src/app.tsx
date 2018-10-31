import * as React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
import { Store } from 'redux';

// Functions
// Containers
import HomePage from './containers/HomePage';
// Redux
import { Dispatch } from './redux/redux-types';

type Props = {
  dispatch: Dispatch;
  store: Store;
};
type State = {};
class WrappedApp extends React.Component<Props, State> {
  public async componentDidMount() {
    // Dispatch initial app load actions here
    // const { dispatch } = this.props;
  }


  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path={'/'} component={HomePage} />
        </Switch>
      </Router>
    );
  }
}
export const App = WrappedApp;
