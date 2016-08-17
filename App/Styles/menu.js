var React = require('react-native');
var NavigatorNavigationBarStyles = require('../Platform/NavigatorNavigationBarStyles');
var colors = require('../Styles/colorscheme');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} = React;

var menu = StyleSheet.create({
    container: {
    	marginTop: NavigatorNavigationBarStyles.General.TotalNavHeight,
        flex: 1,
        flexDirection: 'column'
    },
    general: {
        padding: 5,
        marginTop: 10,
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
    },    
    navbar: {
        paddingTop: 20,
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    navbarItem: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',        
    },
    halfHeight: {
        flex: .35,
        backgroundColor: 'white',
       
    },
    progress: {
        margin: 10
    },    
    row: {
        flex: 0.10,
        marginTop: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.General.line,
    },
    rowfill: {
        flex: 0.20,
        backgroundColor: 'white',
        justifyContent: 'center',
    },    
    row_item: {
    	left: 20
    },
    logout: {
        flex: .35,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.General.line,        
    },
    quarterHeight: {
        flex: .3,
        marginBottom: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',        
    }
});
module.exports= menu;
