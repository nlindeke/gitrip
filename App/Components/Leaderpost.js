/* @flow */
'use strict';
import React, {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

var Rank = require('../Components/Rank')
var colors = require('../Styles/colorscheme');

var Leaderpost = React.createClass({
  render: function() {
    return (
      
      <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#efefef', padding:10}}>

          <View style={styles.imgcont}>
          <Text style={{marginLeft: 10,fontSize: 30, fontWeight: '200'}}>#{this.props.rank}</Text>
          <View style={styles.container}>
          
          <View style={[styles.rowcontainer, {paddingBottom: 1}]}>
              <Text onPress={Actions.PubProfile} style={[styles.name, {marginLeft: 30}]}>{this.props.name}</Text>
              
            <View style={{position: 'absolute', right: 10}}> 
              <Rank id={this.props.rankstar} lvl={this.props.rankcol} />
            </View>
          </View>
          
          </View>
          </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  imgcont: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  rowcontainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 1,
  },
  container: {
    marginTop: 10, 
    flex: 0.8,    
  },
  distance: {
    fontSize: 11,
    color: colors.General.hardline,
    
    right: 0,
  },  
  scores: {
    fontSize: 11,
    color: '#666',
    fontWeight: '300',    

  },
  name: {
    fontSize: 18,
    marginRight: 10,
    color: colors.General.name,
    fontWeight: '400', 
    
    marginLeft: 8 ,
  },    
  title: {
    fontSize: 11,
    fontWeight: '400',
    color: '#222',
    marginLeft: 8,
  },
  vouch: {
    fontSize: 10,
    color: '#999',
    fontWeight: '500',
    marginLeft: 8,
  },  
  card: {
    backgroundColor: 'white',
    fontSize: 11,
    fontWeight: '300',
    color: '#333',
    padding: 2,
    marginLeft: 6,
    marginRight: 30,
  }
});

module.exports = Leaderpost;
