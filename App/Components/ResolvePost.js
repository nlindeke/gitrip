/* @flow */
'use strict';
import React, {
	Component, 
	Image, 
	Text, 
	View, 
	Modal, 
	ListView,
	ScrollView, 
	StyleSheet, 
	TextInput, 
	TouchableOpacity,
} from 'react-native';

import styles from '../Styles/style';
import profile from '../Styles/profile';
import post from '../Styles/post';
import {Actions} from 'react-native-router-flux';

var sendbird = require('sendbird');
var colors = require('../Styles/colorscheme');
var Rank = require('../Components/Rank');
var Method = require('../Services/Methods');
var Point = require('../Services/PointManager');

export default class ResolvePost extends Component {

	constructor(props) { 
		super(props); 
		this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			dataSource: this.dataSource.cloneWithRows([]),
			HelperId: "",
			loaded: false,
			message: 'Testing this noise',
		};
	}
	componentWillMount() {
	 	this.setState({
	 		CounterPartId: this.props.profileUri,
	 		dataSource: this.dataSource.cloneWithRows(this.props.potentHelpers),
	 	});
	    sendbird.getUserInfo((data) => {
	      this.setState({user: data});
	    });	    	 	
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

		        <View style={{flex: 0.9, backgroundColor: 'white'}}>
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
		        	<View style={{padding: 20, flex: 0.4}}>
						<View style={{}}>
							<Text style={{fontSize: 24, fontWeight: '300'}}>{this.props.title}</Text>
						</View>
						<View style={{}}>
							<Text style={{lineHeight: 25, marginTop: 10, fontSize: 16, fontWeight: '300'}}>
								{this.props.message}
							</Text>
						</View>
					
		        	</View>
		        	<View style={{flex: 0.6, padding: 10, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#666'}}>
						<TouchableOpacity 
							style={{padding: 10}}
							onPress={()=> 
							  sendbird.startMessaging(
							    this.state.CounterPartId,
							    {
							      successFunc: (data) => {
							        console.log('success');
							        console.log(data);
							      },
							      errorFunc: (status, error) => {
							        console.log(status, error);
							        console.log(this.state.CounterPartId);
							      }
							    }
							  )
							}
							>
							<Text style={{fontSize: 24, fontWeight: '300'}}> Start Chat </Text>
						</TouchableOpacity>
		        		<ListView dataSource={this.state.dataSource} renderRow={this.renderRow} style={{padding: 10}} />

		        	</View>
		        </View>

		    </View>
		);
	}


	renderRow(rowData) {
		return (
			<View>
			<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
				onPress={()=> sendbird.message("Hejsan bögar")}>
				<Image 
					source={{uri: rowData.img}} 
					style={{borderRadius: 10, marginTop: 16, height: 45, width: 45}} />
				<View style={{flexDirection: 'column', padding: 10}}>
					<Text style={{fontSize: 16, fontWeight: '300'}}> {rowData.fbProfile} </Text>
					<Text style={{fontSize: 14, fontWeight: '300'}}> Press to receive help! </Text>
				</View>
				
	        	<View style={{position: 'absolute', top: 22, right: 10, alignItems: 'center'}}>
	        		<Rank id={Point.stars(rowData.karma)} lvl={Point.badge(rowData.karma)} />
	        	</View>

			</TouchableOpacity>

			</View>
			);
	}
}
