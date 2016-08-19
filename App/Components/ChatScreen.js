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
  ScrollView,
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
      message: '',
      messageList: []
    };
  },
  componentWillMount: function() {
    sendbird.events.onMessageReceived = (obj) => {
      this.setState({messageList: this.state.messageList.concat([obj])});
    };
    this.getMessages();
  },
  getMessages: function() {
    sendbird.getMessageLoadMore({
      limit: 100,
      successFunc: (data) => {
        var _messageList = [];
        data.messages.reverse().forEach(function(msg, index){
          if(sendbird.isMessage(msg.cmd)) {
            _messageList.push(msg.payload);
          }
        });
        this.setState({ messageList: _messageList.concat(this.state.messageList) });
      },
      errorFunc: (status, error) => {
        console.log(status, error);
      }
    });
  },
  render: function() {
    var list = this.state.messageList.map((item, index) => {
      return (
        <View
          style={styles.messageContainer}
          key={index}
          >
          <Text style={this.nameLabel}>
            {item.user.name}
            <Text style={styles.messageLabel}> : {item.message}</Text>
          </Text>
        </View>
      );
    });

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
        <ScrollView
          ref={(c) => this._scrollView = c}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          onContentSizeChange={(e) => {}}>
        {list}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.input}
            value={this.state.message}
            onChangeText={(text) => this.setState({message: text})} />
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
  onSendPress: function() {
    sendbird.message(this.state.message);
    this.setState({message: ''});
  },})

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
