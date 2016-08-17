'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RootRouter from './App/Components/RootRouter';

class Ripple extends Component {
  render() {
    return (
      <RootRouter />
    );
  }
}
AppRegistry.registerComponent('Ripple', () => Ripple);
