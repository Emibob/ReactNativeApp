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
  StatusBarIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

class Emily extends React.Component{
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        navigationBarHidden={true}
        initialRoute={{
          title: 'Home',
          component: Main
        }}/>
    );
  }
};


AppRegistry.registerComponent('Emily', () => Emily);
