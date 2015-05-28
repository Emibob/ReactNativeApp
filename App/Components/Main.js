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
var Swiper = require('react-native-swiper');
var Homepage = require('./Homepage');

var {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Image,
	StatusBarIOS,
	ActivityIndicatorIOS,
	ScrollView
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
		color: 'white', 
		fontFamily: 'BrownStd-Regular', 
		fontSize: 20, 
		textAlign: 'center'
	},
	loader: {
		height: 80
	},
	image: {
		width: 130, 
		height: 84, 
		alignSelf: 'center',
		marginBottom: 10,
		marginTop: 10
	},
	backgroundImage: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0,
		width: 800,
		height: 170,
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
			seriesList: ['Style-Out-There', 'A-Cut-Above', 'Beauty-Tutorials', 'Hang-Time-Jenn-Im', 'Best-Style-Tips', 'Easy-Living-Hacks'],
			mapping: {
				'Style Out There': 'Style-Out-There',
				'Hang Time with Jenn Im': 'Hang-Time-Jenn-Im',
				'Hack Your Heart Out': 'Easy-Living-Hacks',
				'Beauty Prep School': 'Beauty-Tutorials',
				'A Cut Above': 'A-Cut-Above',
				'Split Second Styling Tips': 'Best-Style-Tips'
			}
		}
		this.getModels(); //TODO: make less gross

				api.getWellnessStories('video')
					.then((res) => {
						this.setState({
							allVideoStories: res.result
						})
						this.triggerGettingAllEntries();
					})
	}

	getModels(){
		var list = this.state.seriesList,
				urls = [],
				allSeriesModels = [];

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

					allSeriesModels.push(res.result);

					this.setState({
						allSeriesModels: allSeriesModels
					})

					if(allSeriesModels.length === list.length){
						this.setState({ loaded: true })
					} else{
						this.setState({ loaded: false })
					}
				});
		}
	}

	// testAnimations(){
	// 	var self = this;

	// 	AnimationExperimental.startAnimation({
 //  		node: self.refs['topLevel'],
 //  		duration: 4000,
 //  		easing: 'easeInQuad',
 //  		property: 'opacity',
 //  		toValue: 0.1,
	// 	});
	// 	//<View style={styles.mainContainer} ref='topLevel'>
	// }

	triggerGettingAllEntries(){
		api.getEntrysById(this.state.allVideoStories.card_ids, {
			cardTypes: ['entry']
		}).then((res) => {
			this.setState({
				tenVideoEntries: res.result
			})
			console.log('all video entries', res.result);
		})
	}

	handleEpisode(seriesSlug){
		var list = this.state.seriesList,
				models = this.state.allSeriesModels.slice(),
				firstAll = this.state.allSeriesModels[0],
				first = this.state.mapping[this.state.allSeriesModels[0].feed_name],
				remaining = this.state.allSeriesModels.splice(1,(this.state.allSeriesModels.length-1));

		this.props.navigator.push({
			component: SeriesLanding,
			title: seriesSlug,
			passProps: {
				seriesSlug: first, //next series slug, mapped
				currentModel: firstAll, //entire model of first series
				remainingSeriesModels: remaining, //list of full series to follow
				allSeriesModels: models, //shallow copy of all series models
				mapping: this.state.mapping, //array of models excluding the first
				seriesIndex: 0
			}
		})
	}

	render(){
		var goToSeries = (this.state.loaded) ? <TouchableHighlight onPress={this.handleEpisode.bind(this)} underlayColor="transparent"><Text style={styles.mainTitle}>Browse Video Series</Text></TouchableHighlight> : <View></View>;
		var tenVideoEntries = (this.state.tenVideoEntries) ? <Homepage entries={this.state.tenVideoEntries}/> : <Text>Loading...</Text>;

		return(
			<ScrollView>
			<View style={styles.mainContainer}>
				<View>
					<Image style={styles.backgroundImage} source={{uri: 'http://www.clker.com/cliparts/0/5/9/1/1430368724442417087yellow%20orange%20peach%20pink%20blur%20wallpaper%20android%20background%20mixed%20combiantion%20plus%20radiant%20gradient.jpg'}} />
					<Image style={styles.image} source={require('image!whitelogo')}/>
					{goToSeries}
				</View>
				{tenVideoEntries}

				<ActivityIndicatorIOS
        animating={!this.state.loaded}
        style={styles.loader}
        color={'white'}
        size='large'/>
			</View>
			</ScrollView>
		)
	}
}

module.exports = Main;