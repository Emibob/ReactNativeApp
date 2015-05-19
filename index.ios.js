/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./App/Components/Main');

var {
  AppRegistry,  //var AppRegistry = React.AppRegistry;
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  }
});

class Emily extends React.Component{
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Home',
          component: Main
        }}/>
    );
  }
};


AppRegistry.registerComponent('Emily', () => Emily);
