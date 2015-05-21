var React = require('react-native');
var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');
var Web_View = require('./Helpers/WebView');
var api = require('../Utils/api');
var helpers = require('../Utils/helpers');

var {
	ScrollView,
	Text,
	View,
	TouchableHighlight,
	StyleSheet,
	Image
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	title: {
		marginBottom: 20,
		marginTop: 20,
		fontSize: 25,
		textAlign: 'center',
		color: '#fff',
		fontFamily: 'BrownStd-Regular',
	}
});

class VideoFeed extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			currentStories: '',
			numTimesLoaded: 0,
			moreEntries: this.props.entries.result.card_ids,
		}
	}
	openPage(url){
		this.props.navigator.push({
			component: Web_View,
			title: 'Refinery29',
			passProps: {url}
		});
	}
	render(){
		return(
			<ScrollView style={styles.container}>
				<Text>Poop</Text>
			</ScrollView>
		)
	}
};

VideoFeed.propTypes = {
	entries: React.PropTypes.object.isRequired
}

module.exports = VideoFeed;