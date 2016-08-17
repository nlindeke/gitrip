var React = require('react-native');
var NavigatorNavigationBarStyles = require('../Platform/NavigatorNavigationBarStyles');
var {
    StyleSheet,
} = React;

var addpost = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: NavigatorNavigationBarStyles.General.TotalNavHeight,
    },
    main: {
        flex: .625,
        backgroundColor: 'white',
    },
    headline: {
        flex: .125,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    additional: {
        flex: .25,
    },    
    input: {

    },

});

module.exports= addpost;
