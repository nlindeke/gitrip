'use strict';

import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Dimensions,
  StyleSheet,
  NativeModules,
  Image,
  ListView,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import profile from '../Styles/profile';


var sendbird = require('sendbird');
var windowSize = Dimensions.get('window');

var colors = require('../Styles/colorscheme');
var ResolveView = require('./ResolveView');
var Point = require('../Services/PointManager');
var Method = require('../Services/Methods');

var DirEmitter = NativeModules.DirectoryEmitter;
var AccessToken = DirEmitter.Token;

const FBSDK = require('react-native-fbsdk'); 

module.exports = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      channel: null,
      message: '',
    };
  },
  componentWillMount: function() {
    // Get Channel Info
    sendbird.getChannelInfo((data) => {
      this.setState({channel: data});
      console.log(data);
    });
  },  
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableHighlight
            underlayColor={'#4e4273'}
            onPress={()=>Actions.Navigator()}
            style={{marginLeft: 15}}
            >
            <Image source={require('../img/white_cross@8x.png')} style={{}} />
          </TouchableHighlight>
        </View>
        <View style={styles.chatContainer}>
          <Text style={{color: '#000'}}>{this.props.friend}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.input}
              value={this.state.message}
              onChangeText={(text) => this.setState({message: text})}
              />
          </View>
          <View style={styles.sendContainer}>
            <TouchableHighlight
              underlayColor={'white'}
              onPress={() => this.onSendPress()}
              >
              <Text style={styles.sendLabel}>SEND</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  },
  onBackPress: function() {
    this.props.navigator.pop();
  },
  onSendPress: function(message) {
      sendbird.message(message);
      this.setState({message: ''});
    }
  });
 
  var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#ffffff'
    },
    topContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.General.nav,
      paddingTop: 20,
    },
    chatContainer: {
      flex: 11,
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: colors.General.nav
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    sendContainer: {
      justifyContent: 'flex-end',
      paddingRight: 10
    },
    sendLabel: {
      color: '#ffffff',
      fontSize: 15
    },
    input: {
      width: windowSize.width - 70,
      color: '#555555',
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 5,
      height: 32,
      borderColor: colors.General.nav,
      borderWidth: 1,
      borderRadius: 2,
      alignSelf: 'center',
      backgroundColor: '#ffffff'
    },
  });
