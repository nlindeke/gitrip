'use strict';
import React, {
    AppRegistry,
    Component,
    StatusBarIOS
} from 'react-native';

import RootRouter from './App/Components/RootRouter';
StatusBarIOS.setStyle('light-content');

class Ripple extends Component {
    render() {
        return (
            <RootRouter />
        );
    }
}

AppRegistry.registerComponent('Ripple', () => Ripple);
