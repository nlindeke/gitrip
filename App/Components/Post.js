/* @flow */
'use strict';

import React, {Component, Image, Text, View, Modal, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import styles from '../Styles/style';
import profile from '../Styles/profile';
import post from '../Styles/post';
import {Actions} from 'react-native-router-flux';

var colors = require('../Styles/colorscheme');
var Rank = require('../Components/Rank');
var Method = require('../Services/Methods');

export default class MakeContent extends Component {

 constructor(props) { 
  super(props); 
  this.state = {
  }; 
}

 componentWillMount() {

}	

	render() {
		return(
			<View style={{flex: 1, backgroundColor: colors.General.nav}}>
		        <View style={[profile.topContainer, {flex: 0.1, backgroundColor: colors.General.nav}]}>
		          <TouchableOpacity  style={profile.leftButton} onPress={Actions.Navigator}>
		            <Image source={require('../img/white_cross@8x.png')} style={{}} />
		          </TouchableOpacity>
		          <Text style={{fontWeight: '300', fontSize: 24,color: colors.General.text}}> Post </Text>
		        </View>

		        <View style={{flex: 0.8, backgroundColor: 'white'}}>
		        	<View style={post.container}>
		        		<View style={{padding: 10}}>
		        			<Image 
		        				source={{uri: this.props.imgSrc}} 
		        				style={{borderRadius: 10, marginTop: 16, marginLeft: 10, flex: 0.2, height: 75, width: 75}} />
		        		</View>
			        	<View style={{padding: 10}}>
			        		<Text style={{fontSize: 22, fontWeight: '300', color: colors.General.name}}>{this.props.name}</Text>
			        		<Text style={{fontSize: 16, fontWeight: '300'}}>{this.props.connection}</Text>
			        		<Text style={{fontSize: 16, fontWeight: '300'}}>{this.props.vouch}</Text>
			        	</View>
			        	<View style={{position: 'absolute', right: 10, top: 18, alignItems: 'center'}}>
			        		<Rank id={this.props.stars} lvl={this.props.starcolors} />
			        	</View>
		        	</View>
		        	<View style={{padding: 20}}>
						<View style={{}}>
							<Text style={{fontSize: 24, fontWeight: '300'}}>{this.props.title}</Text>
						</View>
						<View style={{}}>
							<Text style={{lineHeight: 25, marginTop: 10, fontSize: 16, fontWeight: '300'}}>
								{this.props.message}
							</Text>
						</View>
		        	</View>
		        </View>
   
		        <View style={[post.container, {flex: 0.1, justifyContent: 'center', alignItems: 'center'}]}>
		        	<TouchableOpacity onPress={() => {
						    Method.offerHelp(this.props.tokenSupreme, this.props.id)
						    .then((res) => this.setState({

						    })).catch((error) => console.log(error)).done();
						    Actions.Navigator();
		        	}}>
		        		<Text style={{color: 'white',padding: 10, fontWeight: '300', fontSize: 24, marginRight: 40}}>Help</Text>
		        	</TouchableOpacity>
		        	<TouchableOpacity onPress={() => {
						    Method.vouchePost(this.props.tokenSupreme, this.props.id)
						    .then((res) => this.setState({

						    })).catch((error) => console.log(error)).done();
						    Actions.Navigator();

		        	}}>
		        		<Text style={{color: 'white', padding: 10, fontWeight: '300', fontSize: 24, marginLeft: 40}}>Vouch</Text>
		        	</TouchableOpacity>
		        </View>
		    </View>
		);
	}
}
