var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');
var Entries = require('./Entries');
var helpers = require('../Utils/helpers');
var Video = require('react-native-video');
var AnimationExperimental = require('AnimationExperimental');
var SeriesLanding = require('./SeriesLanding');

var {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Image,
	StatusBarIOS
} = React;

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	videoBackground: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0
	},
	colorFilter: {
		backgroundColor: '#363380', 
		opacity: 0.8, 
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	mainTitle: {
		marginTop: 50, 
		color: 'black', 
		fontFamily: 'BrownStd-Regular', 
		fontSize: 30, 
		alignSelf: 'center', 
		textAlign: 'center'
	}
})

class Main extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			showDescription: false,
			seriesList: ['Style-Out-There', 'Trans-America', 'Astrologica', 'Love-Stories']
		}
	}

	handleEpisode(seriesSlug){
		var list = this.state.seriesList,
				first = this.state.seriesList[0],
				remainging = this.state.seriesList.splice(1,(this.state.seriesList.length-1));

		this.props.navigator.push({
			component: SeriesLanding,
			title: seriesSlug,
			passProps: {
				seriesSlug: first,
				seriesList: remainging
			}
		})
	}

	render(){
		var seriesDescription = (this.state.showDescription) ? <Text style={styles.seriesDescription}>Video description</Text> : <Text style={styles.expand}>+</Text>;
		return(

			<View style={styles.mainContainer}>
				
						<Image style={{width: 130, height:84, alignSelf: 'center'}} source={{uri: 'http://s2.r29static.com/blog/q91dog/assets/images/logos/big_logo.png'}}/>

						<TouchableHighlight onPress={this.handleEpisode.bind(this)} underlayColor="transparent">
							<Text style={styles.mainTitle}>GOTO: Video Series</Text>
						</TouchableHighlight>

			</View>

		)
	}
}

StatusBarIOS.setHidden(true, StatusBarIOS.Animation.slide);


module.exports = Main;