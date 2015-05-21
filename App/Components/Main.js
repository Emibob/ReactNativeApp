var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');
var Entries = require('./Entries');
var helpers = require('../Utils/helpers');
var Video = require('react-native-video');
var AnimationExperimental = require('AnimationExperimental');
var SeriesLanding = require('./SeriesLanding');
var Entries = require('./Entries');
var VideoFeed = require('./VideoFeed');

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
		color: 'black'
	},
	image: {
		width: 130, 
		height: 84, 
		alignSelf: 'center',
		marginBottom: 40
	},
	backgroundImage: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0,
		width: 800,
		height: 800,
		flex: 1,
		resizeMode: 'cover'
	}
})

class Main extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			loaded: false,
			showDescription: false,
			seriesList: ['Style-Out-There', 'Easy-Living-Hacks', 'Beauty-Tutorials', 'A-Cut-Above', 'Best-Style-Tips'],
			mapping: {
				'Style Out There': 'Style-Out-There',
				//'Cupidity': 'Love-Stories',
				//'Astrologica': 'Astrologica',
				//'Hang Time with Jenn Im': 'Hang-Time-Jenn-Im',
				'Hack Your Heart Out': 'Easy-Living-Hacks',
				'Beauty Prep School': 'Beauty-Tutorials',
				//'Trend Takeout': 'Trend-Takeout',
				'A Cut Above': 'A-Cut-Above',
				'Split Second Styling Tips': 'Best-Style-Tips'
				//'Beauty Test Lab': 'Beauty-Test-Lab'
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

	handleViewVideoFeed(category){
		api.getWellnessStories(category)
			.then((res) => {
				this.props.navigator.push({
					component: VideoFeed,
					title: 'Video Stories',
					passProps: {
						entries: res,
						subcat: category
					}
				})
			})
			.catch((err) => { console.log('ERROR: ' + error); })
	}

	render(){
		var goToSeries = (this.state.loaded) ? <TouchableHighlight onPress={this.handleEpisode.bind(this)} underlayColor="transparent"><Text style={styles.mainTitle}>Browse Video Series</Text></TouchableHighlight> : <View></View>;
		return(
			<View style={styles.mainContainer}>
				<Image style={styles.backgroundImage} source={{uri: 'http://www.clker.com/cliparts/0/5/9/1/1430368724442417087yellow%20orange%20peach%20pink%20blur%20wallpaper%20android%20background%20mixed%20combiantion%20plus%20radiant%20gradient.jpg'}} />
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