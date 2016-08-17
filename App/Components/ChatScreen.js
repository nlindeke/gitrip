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
    return {
      message: ''
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableHighlight
            underlayColor={'#4e4273'}
            onPress={this.onBackPress}
            style={{marginLeft: 15}}
            >
            <Text style={{color: '#fff'}}>&lt; Back</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.chatContainer}>
          <Text style={{color: '#000'}}>Chat</Text>
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
              underlayColor={'#4e4273'}
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
  onSendPress: function() {
    console.log(this.state.message);
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
      backgroundColor: '#6E5BAA',
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
      backgroundColor: '#6E5BAA'
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
      borderColor: '#6E5BAA',
      borderWidth: 1,
      borderRadius: 2,
      alignSelf: 'center',
      backgroundColor: '#ffffff'
    },
  });