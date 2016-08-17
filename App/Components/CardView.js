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

var Rank = require('../Components/Rank');
var colors = require('../Styles/colorscheme');

import {Actions} from 'react-native-router-flux';

var CardView = React.createClass({
  render: function() {
    return (
      
      <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#ccc', marginTop: 5, marginBottom:5}}>
          <View style={styles.imgcont}>
            <View>
              <Image 
                source={{uri: this.props.imgSrc}}
                style={{borderRadius: 10, marginTop: 16, marginLeft: 10, flex: 0.2, height: 60, width: 60}} />
            </View>

          <TouchableOpacity 
            style={styles.container} 
            onPress={()=>Actions.Post({
              id: this.props.id,
              tokenSupreme: this.props.tokenSupreme,
              vouch: this.props.vouched, 
              name: this.props.fullname,
              title: this.props.title, 
              message: this.props.message,
              starcolors: this.props.starcolors,
              stars: this.props.stars,
              connection: this.props.distance,
              imgSrc: this.props.imgSrc
            })}>
          
              <View style={[styles.rowcontainer, {paddingBottom: 7}]}>
                  <Text style={styles.name}>
                    {this.props.name}
                  </Text>
                  <Text style={styles.distance}>
                    {this.props.distance}
                  </Text>                
                <View style={{position: 'absolute', right: 10}}>
                <Rank 
                  id={this.props.stars} 
                  lvl={this.props.starcolors} />
                  
                </View>
              </View>

              <View style={styles.rowcontainer}>
                <Text style={styles.title}>
                  {this.props.title}
                </Text>
              </View>

              <View style={{padding: 1}}>
                <Text numberOfLines={3} style={styles.card}>{this.props.message}</Text>
              </View>

            <View style={{marginTop:5, marginRight: 10, padding: 1, flexDirection: 'row', paddingBottom: 20, paddingTop: 4}}>
              <Text style={styles.vouch}>
                {this.props.vouched}
              </Text>
            
              <Text style={[styles.vouch, {position: 'absolute', right: 0}]}>Report</Text>
            </View>
          </TouchableOpacity>
          </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  imgcont: {
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
    fontSize: 14,
    color: '#666',
    right: 0,
  },  
  scores: {
    fontSize: 11,
    color: '#666',
    fontWeight: '300',    

  },
  name: {
    fontSize: 16,
    marginRight: 5,
    color: colors.General.name,
    fontWeight: '500', 
    marginLeft: 8 ,
  },    
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginLeft: 8,
  },
  vouch: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
    marginLeft: 8,
  },  
  card: {
    backgroundColor: 'white',
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    padding: 2,
    marginLeft: 6,
    marginRight: 10,
  }
});

module.exports = CardView;
