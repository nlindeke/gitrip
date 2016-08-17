/* @flow */
'use strict';

import React, {Component, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import controlPanel from '../../Styles/controlPanel';
import ButtonRounded from './ButtonRounded';
import {Actions} from 'react-native-router-flux';

export default class ControlPanel extends Component {

    render() {
        return (
            <View style={controlPanel.sidebar}>
                <ScrollView>
                    <View style={{position: 'relative'}}>
                        <TouchableOpacity
                            style={controlPanel.link}
                            underlayColor="#2D2D30"
                            onPress={Actions.home}>
                            <Text style={controlPanel.linkText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{position: 'relative'}}>
                        <TouchableOpacity
                            style={controlPanel.link}
                            underlayColor="#2D2D30"
                            onPress={Actions.account}>
                            <View>
                                <Text style={controlPanel.linkText}>Accounts</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={controlPanel.close}>
                    </View>
                    <ButtonRounded
                        onPress={Actions.home}
                        text="Close" />
                </ScrollView>
            </View>
        );
    }

}
