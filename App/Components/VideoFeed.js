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
		flex: 1,
		height: 400
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
			seriesModel: this.props.seriesModel, 
			seriesInitialCards: this.props.seriesModel.full_cards
			//this.props.seriesModel.card_ids only sometimes...
		}
		// if(this.state.entryIds){
		// 	this.buildMoreStories()
		// }
	}

	buildMoreStories(){
		api.getMoreStories(this.state.entryIds)
			.then((res) => {
				this.setState({
					moreStories: res
				})
			})
	}

	openPage(url){
		this.props.navigator.push({
			component: Web_View,
			title: 'Refinery29',
			passProps: {url}
		});
	}
	render(){
		var moreStories = (this.state.moreStories) ? <Text>Stories Are Here</Text> : <Text>No Stories</Text>;
		return(
			<View style={styles.container}>
				{moreStories}
			</View>
		)
	}
};

VideoFeed.propTypes = {
	entryIds: React.PropTypes.array.isRequired
}

module.exports = VideoFeed;