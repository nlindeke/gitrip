'use strict';

var React = require('react-native');
var {
  View,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TabBarIOS,
  SegmentedControlIOS,
  NativeModules,
  Image,
} = React;
var colors = require('../Styles/colorscheme');

var DirEmitter = NativeModules.DirectoryEmitter;
var AccessToken = DirEmitter.Token;
var Method = require('../Services/Methods');
var appID = '63D5A15D-3448-43AE-B03B-77ED34CD4171';
var sendbird = require('sendbird');

import {Actions} from 'react-native-router-flux';

import Home from './Home';
import Login from './Login';
import Menu from './Menu';
import MakeContent from './makeContent';

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return (
        <TouchableOpacity
          onPress={() => navigator.push({ 
              id: 'Menu',
            })}
          style={styles.navBarLeftButton}>
          <View style={{paddingLeft: 5, marginVertical: 10}}>
          <Image source={require('../img/white_menu@6x.png')} style={{}} />
          </View>
        </TouchableOpacity>
      );
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop({ 
          id: 'Ripple',
        })}
        style={styles.navBarLeftButton}>
        <View style={{paddingLeft: 3, marginVertical: 10}}>
        <Image source={require('../img/whiteback@7x.png')} style={{}} />
        </View>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return (
      <TouchableOpacity
        onPress={() => navigator.push({
          id: 'mkContent',
          sceneConfig: Navigator.SceneConfigs.FloatFromRight,
        })}
        style={styles.navBarRightButton}>
          <View style={{marginVertical: 10}}>
          <Image source={require('../img/white_write@7x.png')} style={{}} />
          </View>
      </TouchableOpacity>
      );
    } else{
      return null;
    };
  },

  Title: function(route, navigator, index, navState) {
    if (index === 0) {
          return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        <Text style={{fontWeight: '400', fontSize: 22,color: colors.General.text}}>Ripple</Text>
      </Text>
    );
    };
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
         
      </Text>
    );
  },

};

var NavigationBarSample = React.createClass({
  getInitialState: function() {
    
    return {
      tokenSupreme: 'Loading custom token...',
    };
  },

  componentWillMount: function() {
    
    Method.loginUser(AccessToken)
    .then((res) => this.setState({
      fbid: JSON.parse(res).user.fbProfile,
      fbusername: JSON.parse(res).user.name,
      userName: JSON.parse(res).user.name,
      tokenSupreme: JSON.parse(res).token,
      imgSrc: JSON.parse(res).user.img,
      karma: JSON.parse(res).user.karma,      
    }))
    .catch((error) => console.log(error))
    .done();
      
    var navigator = this.props.navigator;

    var callback = (event) => {
      console.log(
        `NavigationBarSample : event ${event.type}`,
        {
          route: JSON.stringify(event.data.route),
          target: event.target,
          type: event.type,
        }
      );
    };
  },

  componentWillUnmount: function() {
    this._listeners && this._listeners.forEach(listener => listener.remove());
  },
  renderScene: function(route, navigator) {
    sendbird.init({
      app_id: '63D5A15D-3448-43AE-B03B-77ED34CD4171',
      guest_id: this.state.fbid,
      user_name: this.state.fbusername,
      image_url: "",
      access_token: "",
      successFunc: (data) => {
        console.log('success');
      },
      errorFunc: (status, error) => {
        console.log('error');
        this.setState({
          username: '',
          errorMessage: error
        });
        return;
      }
    });    
    
    switch (route.id) {
      case 'Ripple':
        return <Home tokenSupreme={this.state.tokenSupreme} />;
      case 'Menu':
        return <Menu 
          imgSrc={this.state.imgSrc} 
          name={this.state.userName} 
          tokenSupreme={this.state.tokenSupreme}
          karma={this.state.karma} />;        
      case 'Login':
        return <Login />;
      case 'mkContent':
        return <MakeContent 
          tokenSupreme={this.state.tokenSupreme}
          imgSrc={this.state.imgSrc} />;
      default:
        return (<Home tokenSupreme={this.state.tokenSupreme} />);
    }
  },
  render: function() {
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={{ message: '', }}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar} />} />

    );
  },
});

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: colors.General.background,
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.General.line,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: colors.General.nav,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.General.navline,
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: colors.General.navtext,
    fontWeight: '400',
    marginVertical: 3,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: colors.General.navtext,
  },
  scene: {
    flex: 1,
    paddingTop: 20,
  },
});

module.exports = NavigationBarSample;
