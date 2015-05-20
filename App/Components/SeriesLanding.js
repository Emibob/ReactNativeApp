var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');
var Entries = require('./Entries');
var helpers = require('../Utils/helpers');
var Video = require('react-native-video');
var AnimationExperimental = require('AnimationExperimental');

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
	borderBox: {
		height: 570, 
		width: 330, 
		borderWidth: 2, 
		borderColor: '#fff', 
		alignSelf: 'center',
		marginTop: 30
	},
	nextSeries: {
		color: 'white',
		fontFamily: 'BrownStd-Regular', 
		fontSize: 20,
		textAlign: 'right',
		marginTop: 10,
		marginRight: 10
	},
	seriesTitle: {
		marginTop: 270, 
		color: 'white', 
		fontFamily: 'BrownStd-Regular', 
		fontSize: 30, 
		alignSelf: 'center', 
		textAlign: 'center'
	},
	episode:{
		color: 'white', 
		fontSize: 20, 
		alignSelf: 'center', 
		textAlign: 'center'
	},
	seriesDescription: {
		color: 'white', 
		fontSize: 14, 
		alignSelf: 'center', 
		textAlign: 'left',
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 140,
		bottom: 0
	},
	expand: {
		color: 'white', 
		fontSize: 40, 
		alignSelf: 'center', 
		textAlign: 'center', 
		marginTop: 140
	}
});

class SeriesLanding extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			currentSeries: this.props.seriesSlug,
			seriesList: this.props.seriesList,
			showDescription: false
		}
	}

	handleCategory(category){
		api.getWellnessStories(category)
			.then((res) => {
				this.props.navigator.push({
					component: Entries,
					title: 'Refinery29',
					passProps: {
						entries: res,
						subcat: category
					}
				})
			})
			.catch((err) => { console.log('ERROR: ' + error); })
	}

	componentDidMount(){
		api.getWellnessStories(this.state.currentSeries)
			.then((res) => {
				var description = res.result.full_cards[0].excerpt || res.result.full_cards[1].excerpt,
						title = res.result.full_cards[0].title || res.result.full_cards[1].title;

				this.setState({
					seriesDescription: description,
					seriesEpisode: title,
				})
			})
	}

	handlePressPlus(){
		if (this.state.showDescription === false){
			this.setState({showDescription: true})
		} else {
			this.setState({showDescription: false})
		}
	}

	handleEpisode(){
		console.log('handle episode to web view')
	}

	handleNextSeries(){
		var list = this.state.seriesList,
				first = this.state.seriesList[0],
				remainging = this.state.seriesList.splice(1,(this.state.seriesList.length-1));

		this.props.navigator.push({
			component: SeriesLanding,
			title: 'Next Series',
			passProps: {
				seriesSlug: first,
				seriesList: remainging
			}
		})
	}

	render(){
		var seriesDescription = (this.state.showDescription) ? <Text style={styles.seriesDescription} numberOfLines={2}>{this.state.seriesDescription}</Text> : <Text style={styles.expand}>+</Text>;
		var videoUrls = {
			'Style-Out-There': 'http://cf.c.ooyala.com/xwbDc2cTpLVpKwBVzQr-6SiY23OJ3Ooi/DOcJ-FxaFrRg4gtDIwOmk2OjBrO97z6k?_=l8azlu9pb9',
			'Trans-America': 'http://cf.c.ooyala.com/0ybXJxczrx_JANV3q0a5AQykYyBUSxj0/DOcJ-FxaFrRg4gtDEwOnI5OjBrO-sXix?_=1a9yfz5b3xr',
			'Astrologica': 'http://cf.c.ooyala.com/Zrdmgybjo80V3YUMZtCTUF902GqwnHP8/DOcJ-FxaFrRg4gtDEwOmk2OjBrO6qGv_?_=ijul0izfr',
			'Love-Stories': 'http://cf.c.ooyala.com/lkdXE0czoxKYvf_2Y9c5QP6j_sIBpl9v/DOcJ-FxaFrRg4gtDMwOnI5OjBrO_k5ap?_=xv12afywrk9'
		};
		var videoUrl = videoUrls[this.state.currentSeries];
		return(

			<View style={styles.mainContainer}>
			<Video source={{uri: videoUrl}}
				rate={1.0}
				muted={true}
				repeat={true}
				resizeMode='cover'
				style={styles.videoBackground}/>
				
				<View style={styles.colorFilter}>
					<View style={styles.borderBox}>
						<TouchableHighlight onPress={this.handleNextSeries.bind(this)} underlayColor="transparent">
							<Text style={styles.nextSeries}>Next Series</Text>
						</TouchableHighlight>
						<TouchableHighlight onPress={this.handleCategory.bind(this, this.state.currentSeries)} underlayColor="transparent">
							<Text style={styles.seriesTitle}>{helpers.formatTitle(this.state.currentSeries)}</Text>
						</TouchableHighlight>
						<TouchableHighlight onPress={this.handleEpisode.bind(this)} underlayColor="transparent">
							<Text style={styles.episode}>Episode 5</Text>
						</TouchableHighlight>
						<TouchableHighlight onPress={this.handlePressPlus.bind(this)} underlayColor="transparent">
							{seriesDescription}
						</TouchableHighlight>
					</View>
				</View>

			</View>
		)
	}
};

SeriesLanding.propTypes = {
	seriesSlug: React.PropTypes.string.isRequired,
	seriesList: React.PropTypes.array.isRequired
}

module.exports = SeriesLanding;