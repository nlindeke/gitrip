/* @flow */
'use strict';
import React, {
  Component,
  StyleSheet,
  Navigator,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  NativeModules,
  ListView,
} from 'react-native';

import styles from '../Styles/style';
import home from '../Styles/home';
import feed from '../Styles/feed';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

var CardView = require('./CardView');
var colors = require('../Styles/colorscheme');
var Point = require('../Services/PointManager');
var Method = require('../Services/Methods');

var DirEmitter = NativeModules.DirectoryEmitter;
var AccessToken = DirEmitter.Token;

const FBSDK = require('react-native-fbsdk');

var Home = React.createClass({

  getInitialState: function() {
    return {
      componentSelected: 'One',
      userName: "Loading...",
      friendFeed: 'Loading...',
      localFeed: 'Loading...',
      loaded: false,
      loadedlocal: false,
    };
  },

  changeComponent: function(component) {
    this.setState({
      componentSelected: component,
    })
  },

  renderComponent: function(component) {

      if(component === 'One') {
        return <ComponentOne 
        friendData={this.state.friendFeed}
        tokenSupreme={this.props.tokenSupreme}
        loaded={this.state.loaded} />

      } else if(component === 'Two') {
        return <ComponentTwo
        dataSource={this.state.dataSource}
        tokenSupreme={this.props.tokenSupreme}
        loaded={this.state.loadedlocal} />        
      }
  },
  updateComponent: function() {

  },
  render: function() {
    return (
      <View style={{flex:1}}>
        <View style={styles.controller}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.controlItem} 
              onPress={() => 
                this.changeComponent('One') }>
              <Text style={{fontSize: 18, color:colors.General.navtext}}>Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlItem}
              onPress={() => 
                this.changeComponent('Two') }>
              <Text style={{fontSize: 18, color:colors.General.navtext}}>Local</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.container}>
          {this.renderComponent(this.state.componentSelected)}
      </View>
      </View>
    )
  }
})

var ComponentTwo = React.createClass({

  getInitialState: function() {
  this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return {
    dataSource: this.dataSource.cloneWithRows([]),
    }
  },

  componentWillReceiveProps: function() {
    Method.getLocalFeed(this.props.tokenSupreme)
    .then((res) => this.setState({
      dataSource: this.dataSource.cloneWithRows(JSON.parse(res).friendPosts),
      loaded: true,
    }))
    .catch((error) => console.log(error))
    .done();  
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView(); 
    } else {
      
    return (
       <ListView 
          dataSource={this.state.dataSource} 
          renderRow={this.renderRow}
          style={styles.card} /> 
      )
    }
  },
   renderLoadingView: function() { 
    return ( 
      <TouchableOpacity
        onPress={this.componentWillReceiveProps()}
        style={{alignItems: 'center', alignSelf: 'center', marginTop: 120, justifyContent: 'center'}} > 
        <Text style={{fontSize: 30, fontWeight: '400', color: '#666'}}>   </Text> 
      </TouchableOpacity> 
      ); 
  },

  renderRow: function(rowData) {
    
    return (
        <CardView
          id={rowData.post.id}
          tokenSupreme={this.props.tokenSupreme}
          name={rowData.friend.name}
          imgSrc={rowData.friend.img}
          fullname={rowData.friend.name}
          distance='xyz'
          title={rowData.post.title}
          message={rowData.post.description}
          score='xyz'
          stars={Point.stars(rowData.friend.karma)}
          starcolors={Point.badge(rowData.friend.karma)}
          vouched="Example" />
      )
  },
})

var ComponentOne = React.createClass({

  getInitialState: function() {
  this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return {
    dataSource: this.dataSource.cloneWithRows([]),
    cnt: "",
    }
  },

  componentWillReceiveProps: function() {

    Method.getFriendFeed(this.props.tokenSupreme)
    .then((res) => this.setState({
      dataSource: this.dataSource.cloneWithRows(JSON.parse(res).friendPosts),
      loaded: true,
    }))
    .catch((error) => console.log(error))
    .done();  
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView(); 
    } else {
      
    return (
       <ListView 
          dataSource={this.state.dataSource} 
          renderRow={this.renderRow}
          style={styles.card} /> 
      )
    }
  },
   renderLoadingView: function() { 
    return ( 
      <View
        onPress={this.componentWillReceiveProps()}
        style={{alignItems: 'center', alignSelf: 'center', marginTop: 120, justifyContent: 'center'}} > 
        <Text style={{fontSize: 30, fontWeight: '400', color: '#666'}}>  </Text> 
      </View> 
      ); 
  },

  renderRow: function(rowData) {
    
    return (
        <CardView
          id={rowData.post.id}
          tokenSupreme={this.props.tokenSupreme}
          name={rowData.friend.name}
          imgSrc={rowData.friend.img}
          fullname={rowData.friend.name}
          distance='xyz'
          title={rowData.post.title}
          message={rowData.post.description}
          score='xyz'
          stars={Point.stars(rowData.friend.karma)}
          starcolors={Point.badge(rowData.friend.karma)}
          vouched="Example" />
      )
  }, 
})
module.exports = Home;