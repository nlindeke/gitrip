var React = require('react-native');
var NavigatorNavigationBarStyles = require('../Platform/NavigatorNavigationBarStyles');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} = React;

var profile = StyleSheet.create({
    topContainer: {
    	marginTop: 20,
    	height: NavigatorNavigationBarStyles.General.TotalNavHeight,
    	
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    leftButton: {
    	position: 'absolute',
    	left: 10,
		alignItems: 'center',
        justifyContent: 'center',
    	height: NavigatorNavigationBarStyles.General.TotalNavHeight,

    },
    rightButton: {
        position: 'absolute',
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: NavigatorNavigationBarStyles.General.TotalNavHeight,

    },    
});
module.exports= profile;
