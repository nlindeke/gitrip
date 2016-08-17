/* @flow */
'use strict';

import React, {Component, Text, Image, View, ScrollView, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import profile from '../Styles/profile';
var colors = require('../Styles/colorscheme');
export default class pubprofile extends Component {

	render() {
		return(
			<View style={{flex: 1, backgroundColor: colors.General.nav}}>
		        <View style={[profile.topContainer, {flex: 0.1, backgroundColor: colors.General.nav}]}>
		          <TouchableOpacity  style={profile.leftButton} onPress={Actions.Navigator}>
		            <Image source={require('../img/white_cross@8x.png')} style={{}} />
		          </TouchableOpacity>
		          <Text style={{fontWeight: '300', fontSize: 20,color: colors.General.text}}> David Sundström </Text>
		        </View>
		        <View style={{flex: 0.9, backgroundColor: 'white'}}>
		        </View>


			</View>
		);
	}
}
