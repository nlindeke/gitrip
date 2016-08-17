'use strict';
import React, {Component,
	Navigator,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TabBarIOS,
	StyleSheet,
	Image,
	ProgressViewIOS,
	NativeModules,
} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;

var colors = require('../Styles/colorscheme');
var AnimatedProgress = require('../Platform/AnimatedProgress');
var Rank = require('../Components/Rank');
var Method = require('../Services/Methods');
var Point = require('../Services/PointManager');

var DirEmitter = NativeModules.DirectoryEmitter;
var AccessToken = DirEmitter.Token;

import menu from '../Styles/menu';
import home from '../Styles/home';
import feed from '../Styles/feed';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

var Menu = React.createClass({

	getInitialState: function() {
	    return {
	      componentSelected: 'One',
	      userName: "Loading...",
	      cnt: "",
	    }
	  },
  	componentDidMount: function() {
	    Method.loginUser(AccessToken)
	    .then((res) => this.setState({
	    	all: JSON.parse(res),
	    	userName: JSON.parse(res).user.name,
	    	imgSrc: JSON.parse(res).user.img,
	    	karma: JSON.parse(res).user.karma,
	    	tokenSupreme: JSON.parse(res).token,
	    }))
	    .catch((error) => console.log(error))
	    .done();
	    
	    Method.getOngoingPosts(this.props.tokenSupreme)
		.then((res) => this.setState({
			cnt: JSON.parse(res).pending,
			loaded: true,
	    }))
	    .catch((error) => console.log(error))
	    .done();	    
	  },

	render() {
		return(		
          <View style={menu.container}>
              <View style={[menu.quarterHeight, {backgroundColor: colors.General.nav}]}>
	              <View style={{marginTop: 10, flex: 1, justifyContent: 'center'}}>
	              	<View style={menu.general}>
		              	<Image source={{uri: this.props.imgSrc}} style={{borderColor: 'white', borderWidth: 3, height: 70, width: 70, borderRadius: 10, marginRight: 30}} />
		              	<View style={{flexDirection: 'column'}}>
							<Text style={{fontSize: 18, color: colors.General.text}}>{this.props.name}</Text>
							<Text style={{fontSize: 14, color: colors.General.text}}>Karma: {this.props.karma}</Text>
							
						</View>
	              	</View>
	              </View>
	              <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
	              <View style={menu.navbar}>
						<TouchableOpacity 
							style={menu.navbarItem}
							onPress={()=>Actions.OnGoing({
								tokenSupreme: this.props.tokenSupreme,
								yourName: this.props.userName,
						})}>
							<Text style={{marginBottom: 1, fontSize: 18, color: colors.General.text}}>{Object.keys(this.state.cnt).length}</Text>
							<Text style={{fontSize: 18, color: colors.General.text}}>Active</Text>
						</TouchableOpacity>

						<TouchableOpacity 
							style={menu.navbarItem}
							onPress={()=>Actions.Leaderboard({
								tokenSupreme: this.props.tokenSupreme,
							})}>
							<Image style={{marginBottom: 5}} source={require('../img/tro@8x.png')} />
							<Text style={{fontSize: 18, color: colors.General.text}}>Leaderboard</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={menu.navbarItem}
							onPress={()=>Actions.myHistory({
								tokenSupreme: this.props.tokenSupreme,
							})}>
							<Image style={{marginBottom: 5}} source={require('../img/hist@8x.png')} />
							<Text style={{fontSize: 18, color: colors.General.text}}>History</Text>
						</TouchableOpacity>															
	              	</View>
	              	</View>
              </View>

              <View style={menu.halfHeight}>
              	<View style={{justifyContent: 'center', alignItems: 'center'}}>
              		<Text style={{padding: 20}}> Current Rank:  </Text>
              		<Rank id={Point.bigStars(this.props.karma)} lvl={Point.badge(this.props.karma)} />            		
              	</View>              
              	<View style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
              		<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
	              		<Text>Progress Untill: </Text>
	              		<Rank id={Point.stars(Point.stars(this.props.karma).high + 1)} lvl={Point.badge(Point.stars(this.props.karma).high + 1)} />
              		</View>
              		<ProgressViewIOS 
	              		style={{
	              			marginTop: 20, 
	              			height: 10, 
	              			width: 250
	              			}} 
	              		progressTintColor="yellow" 
	              		progress={
	              			(this.props.karma - Point.stars(this.props.karma).low) / (Point.stars(this.props.karma).high - Point.stars(this.props.karma).low)
              		}/>
              		
              	</View>

              </View>
              <View style={[menu.logout, {backgroundColor: '#efefef'}]}>
	              <View style={{padding: 10}}>
	              	<Text>About Ripple</Text>
	              </View>
	              <View style={{padding: 10}}>
	              	<Text>Contact Us!</Text>
	              </View>
	              <View style={{padding: 10}}>
	              	<Text>User Agreement</Text>
	              </View>              
	              <View style={{padding: 10}}>
	              	<LoginButton
	              		publishPermissions={["publish_actions"]}
		                onLogoutFinished={() => {
		                	Actions.login()
		                	alert("You Are Now Logged Out!")
		                }
		            } />
              	</View>
              </View>
          </View>
		);
	}
})
module.exports = Menu;
