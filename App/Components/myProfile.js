/* @flow */
'use strict';

import React, {Component, Text, View, ScrollView, TouchableOpacity, TabBarIOS} from 'react-native';
import {Actions} from 'react-native-router-flux';
import profile from '../Styles/profile';

export default class myprofile extends Component {

	render() {
		return(
			<View>
				<View style={profile.topContainer}>
					<TouchableOpacity  style={profile.leftButton} onPress={Actions.Navigator}>
						<Text>[Exit Button]</Text>
					</TouchableOpacity>
					<Text> My Profile </Text>
				</View>


			</View>
		);
	}
}
