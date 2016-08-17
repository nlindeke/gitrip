var React = require('react-native');
var NavigatorNavigationBarStyles = require('../Platform/NavigatorNavigationBarStyles');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} = React;

var colors = require('../Styles/colorscheme');
var styles = StyleSheet.create({


    container: {
        flex: 0.95,
    },
    controller: {
        backgroundColor: colors.General.nav,
        flex: 0.05,
        flexDirection: 'row',
        padding: 5,
        marginTop: NavigatorNavigationBarStyles.General.TotalNavHeight,
        height: 0.7 * NavigatorNavigationBarStyles.General.TotalNavHeight,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.General.line,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {

    },
    controlItem: {
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressbtn: {
        color: 'white',
    }

});

module.exports= styles;
