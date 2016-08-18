/* @flow */
'use strict';
import React, {
  Component,
  View, 
  Image,
} from 'react-native';
import styles from '../Styles/style';
import login from '../Styles/login';
import {Actions} from 'react-native-router-flux';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;

const AccessToken = require('react-native-fbsdk/js/FBAccessToken');

export default class Login extends Component {
  render() {
      return(
          <View>
          	<View style={{flex: 1, alignItems: 'center', padding: 50, marginTop: 250}}>
              <View> 
                <LoginButton
                  readPermissions={['user_friends']}
                  onLoginFinished={
                    (error, result) => {
                      if (error) {
                        alert("login has error: " + result.error);
                      } else if (result.isCancelled) {
                        alert("login is cancelled.");
                      } else {
                        Actions.Navigator();

                      }
                    }
                  }
                  onLogoutFinished={() => {
                    alert("logout.")}}/>
              </View>
          	</View>
          </View>
      );
  }
}





