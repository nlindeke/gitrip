'use strict';
import React, {Component, Navigator, Text, View} from 'react-native';
import {Router, Modal, Route, Schema, Scene} from 'react-native-router-flux';
import EventEmitter from 'EventEmitter';
import ControlPanel from './Widgets/ControlPanel';

import Login from './Login';
import Home from './Home';
import Menu from './Menu';
import MyProfile from './myProfile';
import PubProfile from './pubProfile';
import Nav from './Navigator';
import OnGoing from './OnGoing';
import myHistory from './myHistory';
import makeContent from './makeContent';
import Leaderboard from './Leaderboard';
import Post from './Post';
import ResolvePost from './ResolvePost';
import Chat from './ChatScreen';


import layout from '../Styles/layout';
import AppEventEmitter from '../Services/AppEventEmitter';

export default class RootRouter extends Component {

    render() {
        return(
        	<View style={layout.layout}>
        		<Router hideNavBar={true}>
	        		<Schema name="default" />
    					<Route name="login" component={Login} initial={true}/>
    					<Route name="Navigator" component={Nav} title="Navigator" />
              <Route name="Home" component={Home} title="Home" />
              <Route name="Menu" component={Menu} title="Menu" />
              <Route name="Post" component={Post} title="Post" />
              <Route name="ResolvePost" component={ResolvePost} title="ResolvePost" />
              <Route name="myHistory" Schema={'Modal'} component={myHistory} title="myHistory" />
              <Route name="OnGoing" Schema={'Modal'} component={OnGoing} title="OnGoing" />
              <Route name="Leaderboard" Schema={'Modal'} component={Leaderboard} title="Leaderboard" />
              <Route name="MyProfile" component={MyProfile} title="MyProfile" />
              <Route name="PubProfile" component={PubProfile} title="PubProfile" />
    				  <Route name="MakeContent" component={makeContent} title="MakeContent" />
              <Route name="Chat" component={Chat} title="Chat" />
        </Router>
			</View>
        );
    }
}
