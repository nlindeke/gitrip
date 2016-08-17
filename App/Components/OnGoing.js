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
import styles from '../Styles/style';

var colors = require('../Styles/colorscheme');
var ResolveView = require('./ResolveView');
var Point = require('../Services/PointManager');
var Method = require('../Services/Methods');

var DirEmitter = NativeModules.DirectoryEmitter;
var AccessToken = DirEmitter.Token;

const FBSDK = require('react-native-fbsdk');

export default class OnGoing extends Component {

 constructor(props) { 
  super(props); 
  this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  this.state = {
    dataSource: this.dataSource.cloneWithRows([]),
    loaded: false,
  };  
}

 componentDidMount() {
    Method.getOngoingPosts(this.props.tokenSupreme)
    .then((res) => this.setState({
      dataSource: this.dataSource.cloneWithRows(JSON.parse(res).pending),
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
          <Text style={{fontSize: 24, color: colors.General.text}}> Active </Text>
        </View>
        <View style={{flex: 0.85, backgroundColor: 'white'}}>
          <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} />
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
  renderRow(rowData, rowID) { 
    return (
      <ResolveView
        id={rowData.post.id}
        fbProfile={rowData.poster.fbProfile}
        name={rowData.poster.name}
        fullname={rowData.poster.name}
        title={rowData.post.title}
        imgSrc={rowData.poster.img}
        id={rowData.post.id}
        stars={Point.stars(rowData.poster.karma)}
        starcolors={Point.badge(rowData.poster.karma)}
        potentHelpers={rowData.potentialHelpers}

        message={rowData.post.description} />  
      );
}

}
