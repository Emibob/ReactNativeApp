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
	StatusBarIOS,
	ActivityIndicatorIOS
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
		color: 'black', 
		fontFamily: 'BrownStd-Regular', 
		fontSize: 20, 
		textAlign: 'center'
	},
	loader: {
		height: 80, 
		color: 'red'
	},
	image: {
		width: 130, 
		height: 84, 
		alignSelf: 'center',
		marginBottom: 40
	}
})

class Main extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			loaded: false,
			showDescription: false,
			seriesList: ['Style-Out-There', 'Love-Stories', 'Easy-Living-Hacks', 'Hang-Time-Jenn-Im', 'Beauty-Tutorials', 'Astrologica'],
			mapping: {
				'Style Out There': 'Style-Out-There',
				'Cupidity': 'Love-Stories',
				'Astrologica': 'Astrologica',
				'Hang Time with Jenn Im': 'Hang-Time-Jenn-Im',
				'Hack Your Heart Out': 'Easy-Living-Hacks',
				'Beauty Prep School': 'Beauty-Tutorials'
			}
		}
		this.getModels() //TODO: make less gross
	}

	getModels(){
		var list = this.state.seriesList,
				urls = [],
				seriesModels = [];

		for(var i = 0; i < list.length; i ++) {
			var requestUrl = 'http://api.refinery29.com/api/2/feeds/' + list[i];
			urls.push({
				fullUrl: requestUrl,
				slug: list[i] //TODO: propbably dont need this anymore doesnt need to be an obj
			});
		}

		for(var j = 0; j < urls.length; j ++) {
			api.getContent(urls[j].fullUrl)
				.then((res) => {

					seriesModels.push(res.result);

					this.setState({
						seriesModels: seriesModels
					})

					if(seriesModels.length === list.length){
						this.setState({ loaded: true })
					} else{
						this.setState({ loaded: false })
					}
				});
		}
	}

	handleEpisode(seriesSlug){
		var list = this.state.seriesList,
				models = this.state.seriesModels.slice(),
				firstAll = this.state.seriesModels[0],
				first = this.state.mapping[this.state.seriesModels[0].feed_name],
				remaining = this.state.seriesModels.splice(1,(this.state.seriesModels.length-1));

		this.props.navigator.push({
			component: SeriesLanding,
			title: seriesSlug,
			passProps: {
				seriesSlug: first, //next series slug, mapped
				nextModel: firstAll, //entire model of first series
				seriesList: remaining, //list of full series to follow
				seriesModels: models, //shallow copy of all series models
				mapping: this.state.mapping //array of models excluding the first
			}
		})
	}

	render(){
		var goToSeries = (this.state.loaded) ? <TouchableHighlight onPress={this.handleEpisode.bind(this)} underlayColor="transparent"><Text style={styles.mainTitle}>GOTO: Video Series</Text></TouchableHighlight> : <View></View>;
		return(
			<View style={styles.mainContainer}>
				<Image style={styles.image} source={{uri: 'http://s2.r29static.com/blog/q91dog/assets/images/logos/big_logo.png'}}/>
				{goToSeries}
				<ActivityIndicatorIOS
        animating={!this.state.loaded}
        style={styles.loader}
        size="large"/>
			</View>
		)
	}
}

StatusBarIOS.setHidden(true, StatusBarIOS.Animation.slide);

module.exports = Main;