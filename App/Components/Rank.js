'use strict';
import React, {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

var colors = require('../Styles/colorscheme');
import {Actions} from 'react-native-router-flux';

var Rank = React.createClass({
  render: function() {
    switch (this.props.id) {
      case 'smallone':
        return (
          <View style={[styles.lvl1 ,{backgroundColor: this.props.lvl}]}>
            <Image source={require('../img/gold@10x.png')} style={{padding: 5}} />
            <Image source={require('../img/white@10x.png')} style={{padding: 5}} />
            <Image source={require('../img/white@10x.png')} style={{padding: 5}} />
          </View>
          ); break;
      case 'bigone':
        return (
          <View style={[styles.lvl1 ,{backgroundColor: this.props.lvl}]}>
            <Image source={require('../img/gold.png')} style={{padding: 10}} />
            <Image source={require('../img/white.png')} style={{padding: 10}} />
            <Image source={require('../img/white.png')} style={{padding: 10}} />
          </View>
          ); break;
      case 'smalltwo':
        return (
          <View style={[styles.lvl1 ,{backgroundColor: this.props.lvl}]}>
            <Image source={require('../img/gold@10x.png')} style={{padding: 5}} />
            <Image source={require('../img/gold@10x.png')} style={{padding: 5}} />
            <Image source={require('../img/white@10x.png')} style={{padding: 5}} />
          </View>
          ); break;
      case 'bigtwo':
        return (
          <View style={[styles.lvl1 ,{backgroundColor: this.props.lvl}]}>
            <Image source={require('../img/gold.png')} style={{padding: 10}} />
            <Image source={require('../img/gold.png')} style={{padding: 10}} />
            <Image source={require('../img/white.png')} style={{padding: 10}} />
          </View>
          ); break;
      case 'smallthree':
        return (
          <View style={[styles.lvl1 ,{backgroundColor: this.props.lvl}]}>
            <Image source={require('../img/gold@10x.png')} style={{padding: 5}} />
            <Image source={require('../img/gold@10x.png')} style={{padding: 5}} />
            <Image source={require('../img/gold@10x.png')} style={{padding: 5}} />
          </View>
          ); break;
      case 'bigthree':
        return (
          <View style={[styles.lvl1 ,{backgroundColor: this.props.lvl}]}>
            <Image source={require('../img/gold.png')} style={{padding: 10}} />
            <Image source={require('../img/gold.png')} style={{padding: 10}} />
            <Image source={require('../img/gold.png')} style={{padding: 10}} />
          </View>
          ); break;
      case 'smallwhite':
        return (
          <View style={[styles.lvl1 ,{backgroundColor: this.props.lvl}]}>
            <Image source={require('../img/white@10x.png')} style={{padding: 5}} />
            <Image source={require('../img/white@10x.png')} style={{padding: 5}} />
            <Image source={require('../img/white@10x.png')} style={{padding: 5}} />
          </View>
          ); break;
      case 'bigwhite':
        return (
          <View style={[styles.lvl1 ,{backgroundColor: this.props.lvl}]}>
            <Image source={require('../img/white.png')} style={{padding: 10}} />
            <Image source={require('../img/white.png')} style={{padding: 10}} />
            <Image source={require('../img/white.png')} style={{padding: 10}} />
          </View>
          ); break;                          
      default:
        return (
          <View style={styles.lvl1}>
            <Text>Null</Text>
          </View>
          );
      }
    }
  });

var styles = StyleSheet.create({
  lvl3: {
    padding: 3,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  lvl2: {
    padding: 3,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lvl1: {
    padding: 3,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },  
});

module.exports = Rank;
