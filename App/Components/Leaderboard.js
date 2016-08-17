/* @flow */
'use strict';

import React, {
      Component, 
      Text, 
      Image, 
      View, 
      ScrollView, 
      TouchableOpacity,
      NativeModules,
      ListView,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import profile from '../Styles/profile';


var Leaderboardpost = require('./Leaderpost');
var colors = require('../Styles/colorscheme');
var Point = require('../Services/PointManager');
var Method = require('../Services/Methods');


export default class Leaderboard extends Component {

 constructor(props) { 
  super(props); 
  this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  this.state = {
    dataSource: this.dataSource.cloneWithRows([]),
    loaded: false,
  };  
  }

   componentDidMount() {
    console.log(this.props.tokenSupreme);
      Method.getLeaderboardFriends(this.props.tokenSupreme)
      .then((res) => this.setState({
        dataSource: this.dataSource.cloneWithRows(JSON.parse(res).listSorted),
        loaded: true,
      }))
      .catch((error) => console.log(error))
      .done();
  }

      render() {
      if (!this.state.loaded) {
        return this.renderLoading();
      }
            return(
      <View style={{flex:1, backgroundColor: colors.General.nav}}>
        <View style={[profile.topContainer, {backgroundColor: colors.General.nav}]}>
          <TouchableOpacity  style={profile.leftButton} onPress={() => Actions.Navigator(
            this.setState({
              dataSource: 'loading',
              loaded: false,
            })
          )}>
            <Image source={require('../img/white_cross@8x.png')} />
          </TouchableOpacity>
          <Text style={{fontSize: 24, color: colors.General.text}}> Leaderboard </Text>
        </View>
      <View style={{backgroundColor: 'white', flex: 0.05, alignItems: 'center', padding: 10,flexDirection: 'row', borderBottomColor: colors.General.line, borderBottomWidth: 1}}>
            <Text style={{fontSize: 18, marginLeft: 10}}>Ranking</Text>
            <Text style={{fontSize: 18, marginLeft: 30}}>Name</Text>
            <Text style={{fontSize: 18, position: 'absolute', top:20, right: 25}}>Badge</Text>

      </View>        
        <View style={{flex: 0.85, backgroundColor: 'white'}}>
        <View>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} />

        </View>
        </View>         
      </View>
            );
      }

  renderLoading() {
    return(
        <View style={{flex:1, backgroundColor: colors.General.nav}}>
        <View style={[profile.topContainer, {backgroundColor: colors.General.nav}]}>
          <TouchableOpacity  style={profile.leftButton} onPress={() => Actions.Navigator(
            this.setState({
              dataSource: 'loading',
              loaded: false
            })
          )}>
            <Image source={require('../img/white_cross@8x.png')} />
          </TouchableOpacity>
          <Text style={{fontSize: 24, color: colors.General.text}}> Active </Text>
        </View>
        <View style={{flex: 0.85, backgroundColor: 'white'}}>
        
        </View>   
        </View>
      );
  }
  renderRow(rowData) { 
    
    return (
      <Leaderboardpost
        name={rowData.name} 
        rankstar={Point.stars(rowData.karma)}
        rankcol={Point.badge(rowData.karma)} />  
      );
}
}
