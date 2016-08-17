/* @flow */
'use strict';
import React, {Component, Text, View, TouchableOpacity, Navigator, MySceneComponent} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import navbarStyle from './../../Styles/navbar.js';
import {Actions} from 'react-native-router-flux';
import AppEventEmitter from '../../Services/AppEventEmitter';


export default class Navbar extends Component {


    render() {
        return(
             <Navigator 
             initialRoute={{name: 'My First Scene', index: 0}} 
             renderScene={(route, navigator) => 
                <MySceneComponent 
                name={route.name} 
                onForward={() => { 
                    var nextIndex = route.index + 1; 
                    navigator.push({ 
                        name: 'Scene ' + nextIndex, 
                        index: nextIndex, 
                    }); 
                }} 
                onBack={() => { 
                    if (route.index > 0) { 
                        navigator.pop(); 
                    } 
                }} /> } />

        );
    }
}
