/* @flow */
'use strict';

import React, {Component, Image, Text, View, ScrollView, TextInput, TouchableOpacity, NativeModules} from 'react-native';
import styles from '../Styles/style';
import post from '../Styles/addpost';
import {Actions} from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox';

var colors = require('../Styles/colorscheme');
var Method = require('../Services/Methods');
var DirEmitter = NativeModules.DirectoryEmitter;
var AccessToken = DirEmitter.Token;

var makeContent = React.createClass({
  getInitialState: function() {
    return {
      headline: 'Nothing is yet written',
      breadText: 'No bread either...',
      LAT: 1,
      LONG: 1,
    };
  },
  componentWillMount: function() {

    Method.loginUser(AccessToken)
    .then((res) => this.setState({
      userName: JSON.parse(res).user.name,
      tokenSupreme: JSON.parse(res).token,
    }))
    .catch((error) => console.log(error))
    .done();
    },

	render() {
		return(
				<View style={post.container}>
					<View style={post.headline}>
						<View style={{flex: 0.2, left: 5, padding: 5}}>
						<Image source={{uri: this.props.imgSrc}} style={{borderColor: 'white', borderWidth: 3, height: 65, width: 65, borderRadius: 10, marginRight: 30}} />
						 </View>
						 <View style={{flex: 0.8, right: 5, padding: 5}}>
						 <TextInput
						 	style={{height: 60, color: '#999', fontSize: 18}}
						 	multiline={false}
						 	keyboardType="default"
						 	maxLength={40}
						 	autoFocus={true}
					        enablesReturnKeyAutomatically={true}
					        returnKeyType='done'
					        onChangeText={(text) => 
					        	this.setState({
					        		headline: text
					        	})}					 	
							onSubmitEditing={(event) => {
								this.refs.SecondInput.focus()
							}}
						 	defaultValue={'An Appropriate Headline'} />
						 </View>
					</View>
					<View style={post.main}>
						<TextInput
							ref='SecondInput'
							style={{height: 200, color: '#999', fontSize: 18, padding: 10}} 
							multiline={true}
							keyboardType={'default'}
							maxLength={200}
						 	autoFocus={true}
						 	blurOnSubmit={true}
					        enablesReturnKeyAutomatically={true}
					        returnKeyType='done'
					        onChangeText={(text) => 
					        	this.setState({
					        		breadText: text
					        	})}
							defaultValue={'Write Your Question Here'} />
					</View>

					<View style={[post.additional, {backgroundColor: colors.General.nav, flex: 0.1}]}>
				        <TouchableOpacity onPress={() => {

						    Method.addPost(this.state.tokenSupreme, this.state.headline, this.state.breadText, this.state.LAT, this.state.LONG)
						    .then((res) => this.setState({
						    	title: this.state.headline,
						    	description: this.state.breadText,
						    	lat: 0,
						    	long: 0,
						    })).catch((error) => console.log(error)).done();
				        	Actions.Navigator();
				        }}
				        style={{
				        	flex: 1, 
				        	flexDirection: 'row', 
				        	justifyContent: 'center', 
				        	alignItems: 'center'
				        }}>
				        	<Text style={{color: 'white', padding: 10, fontWeight: '300', fontSize: 24}}>Post</Text>
				        </TouchableOpacity>
					</View>


				</View>
		);
	}
})
module.exports = makeContent;
