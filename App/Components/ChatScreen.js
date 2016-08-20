'use strict';

import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  NativeModules,
  Image,
  ListView,
  ScrollView,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import profile from '../Styles/profile';

var sendbird = require('sendbird');
var windowSize = Dimensions.get('window');

var colors = require('../Styles/colorscheme');
var ResolveView = require('./ResolveView');
var Point = require('../Services/PointManager');
var Method = require('../Services/Methods');

var DirEmitter = NativeModules.DirectoryEmitter;
var AccessToken = DirEmitter.Token;
var footerY;

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
      if (item.user.name === this.props.name) {
      return (
        <View key={index}>
          <Text style={{color: colors.General.nav, fontWeight: '500', padding: 10}}>
          {item.user.name} : 
            <Text style={{color: '#666'}}> {item.message}</Text>
          </Text>
          <View onLayout={(e)=> {
            footerY = e.nativeEvent.layout.y;
            }}/>          
        </View>
      );        
    } else {
      return (
        <View
          style={{justifyContent: 'flex-end'}}
          key={index}>
          <Text style={{color: colors.General.nav, fontWeight: '500', padding: 10}}>
            You : 
            <Text style={{color: '#666'}}> {item.message}</Text>
          </Text>
          <View onLayout={(e)=> {
            footerY = e.nativeEvent.layout.y;
            }}/>          
        </View>
        );
    }

    });

  return (
    <View style={styles.container}>
      <View style={[profile.topContainer, {backgroundColor: colors.General.nav}]}>
        <TouchableOpacity  style={profile.leftButton} onPress={() => Actions.Navigator()}>
          <Image source={require('../img/white_cross@8x.png')} />
        </TouchableOpacity>
        <Image source={{uri: this.props.friendpic}} style={{borderColor: 'white', padding: 10, marginRight: 10, borderWidth: 2, height: 30, width: 30, borderRadius: 5}} />
        <Text style={{fontSize: 18, color: colors.General.text}}> {this.props.name} </Text>       
      </View>
      <View style={{
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 40, 
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.General.line,
      }}>
      <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center', borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: colors.General.line}}>
        <TouchableOpacity  onPress={() =>
          sendbird.endMessaging(
            this.props.url,
            {
              successFunc: (data) => {              
                Actions.Navigator();
              },
              errorFunc: (status, error) => {
                console.log(status, error);
              }
            }
          )         
        }>
          <Text style={{fontSize: 12, color: colors.General.nav}}>Problem Solved</Text>
        </TouchableOpacity>
        </View>
        <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity  onPress={() =>
          sendbird.endMessaging(
            this.props.url,
            {
              successFunc: (data) => {              
                Actions.Navigator();
              },
              errorFunc: (status, error) => {
                console.log(status, error);
              }
            }
          )         
        }>
          <Text style={{fontSize: 12, color: colors.General.nav}}>Problem Not Solved</Text>
        </TouchableOpacity>  
        </View>      

      </View>

      <View style={styles.chatContainer}>
      
        <ScrollView
          ref='_ScrollView'
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}>
        {list}
        </ScrollView>
      
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <TextInput
              keyboardType={'default'}
              autoFocus={true}
              blurOnSubmit={true}
              enablesReturnKeyAutomatically={true}
              returnKeyType='done'
            style={styles.input}
            value={this.state.message}
            onChangeText={(text) => this.setState({message: text})} />
        </View>
        <View style={styles.sendContainer}>
          <TouchableOpacity
            onPress={() => 
              this.onSendPress()
            }>
            <Image style={styles.sendLabel} source={require('../img/send@15x.png')} style={{}} />
          </TouchableOpacity>
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
      backgroundColor: colors.General.nav
    },
    topContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.General.nav,
      paddingTop: 40,
      marginTop: 100,
    },
    chatContainer: {
      flex: 11,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: 'white',
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.General.line,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: 10,
    },
    sendContainer: {
      justifyContent: 'flex-end',
      paddingRight: 5,
      paddingLeft: 5,
      padding: 5,
    },
    sendLabel: {
      color: '#ffffff',
      fontSize: 15
    },
    input: {
      width: windowSize.width - 80,
      color: '#555555',
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 5,
      height: 32,
      borderRadius: 10,
      borderColor: colors.General.line,
      borderWidth: 1,
      borderRadius: 8,
      alignSelf: 'center',
      backgroundColor: '#eee'
    },
  });
