var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');
var Entries = require('./Entries');
var helpers = require('../Utils/helpers');
var Video = require('react-native-video');
var AnimationExperimental = require('AnimationExperimental');
var Web_View = require('./Helpers/WebView');

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
	imageFallback:{
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0,
		width: 800,
		height: 800,
		flex: 1,
		resizeMode: 'cover'
	},
	colorFilter: {
		backgroundColor: '#363380', 
		opacity: 0.7, 
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
		marginTop: 200, 
		color: 'white', 
		fontFamily: 'BrownStd-Regular', 
		fontSize: 25, 
		alignSelf: 'center', 
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	episode:{
		color: 'white', 
		fontSize: 15, 
		alignSelf: 'center', 
		textAlign: 'center',
		marginTop: 10,
		paddingLeft: 20,
		paddingRight: 20
	},
	seriesDescription: {
		color: 'white', 
		fontSize: 14, 
		alignSelf: 'center', 
		textAlign: 'left',
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 130,
		bottom: 0,
		lineHeight: 24
	},
	expand: {
		color: 'white', 
		fontSize: 40, 
		alignSelf: 'center', 
		textAlign: 'center', 
		marginTop: 130
	},
	separator: {
		height: 1,
		backgroundColor: '#fff',
		width: 260,
		alignSelf: 'center',
		marginTop: 10
	}
});

class SeriesLanding extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			currentSeries: this.props.seriesSlug,
			seriesList: this.props.seriesList, //remaining models
			showDescription: false,
			seriesModels: this.props.seriesModels, //array of objs
			nextModel: this.props.nextModel, //the CURRENT, chosen model
			ooyalaVideoUrl: 'http://cf.c.ooyala.com/' + this.props.nextModel.full_cards[1].ooyala_video + '/DOcJ-FxaFrRg4gtDEwOjIwbTowODE7WK',
			mapping: this.props.mapping
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
	
	componentWillMount(){
		var firstCard = this.state.nextModel.full_cards[0],
				secondCard = this.state.nextModel.full_cards[1],
				description = (firstCard.excerpt) ? firstCard.excerpt : secondCard.excerpt,
				title = (firstCard.meta.title) ? firstCard.meta.title : secondCard.meta.title,
				fallbackImage = (firstCard.main_image) ? firstCard.main_image.src : secondCard.main_image.src,
				entriesList = this.state.nextModel.full_cards;


		this.setState({
			seriesDescription: description,
			seriesEpisode: title,
			seriesListOfEntires: entriesList,
			fallbackImage: fallbackImage
		})
	}

	componentDidMount(){
		console.log('componentDidMount');
	}

	handlePressPlus(){
		if (this.state.showDescription === false){
			this.setState({showDescription: true})
		} else {
			this.setState({showDescription: false})
		}
	}

	handleEpisode(){
		console.log('handle episode to web view');
		var url = this.state.seriesListOfEntires[1].canonical; //hardcode first episode for now

		this.props.navigator.push({
			component: Web_View,
			title: 'Refinery29',
			passProps: {url}
		})
	}

	handleNextSeries(seriesSlug){
		if(this.state.seriesList[0]){
		var list = this.state.seriesList,
				firstAll = this.state.seriesList[0],
				first = this.state.mapping[this.state.seriesList[0].feed_name],
				remaining = this.state.seriesList.splice(1,(this.state.seriesList.length-1));
				console.log(this.state);


			this.props.navigator.push({
				component: SeriesLanding,
				title: seriesSlug,
				passProps: {
					seriesSlug: first, //next series slug, mapped
					nextModel: firstAll, //entire model of first series
					seriesList: remaining, //list of full series to follow
					seriesModels: this.props.seriesModels, //shallow copy of all series models
					mapping: this.state.mapping //array of models excluding the first
				}
			})
		} else {
			console.log('end of series');
		}
	}

	render(){
		var seriesDescription = (this.state.showDescription) ? <Text style={styles.seriesDescription} numberOfLines={3}>{this.state.seriesDescription}</Text> : <Text style={styles.expand}>+</Text>;
		// var videoUrls = {
		// 	'Style-Out-There': 'http://cf.c.ooyala.com/1qeHV0cTq-oNW3ZdUiLhjve7OPoZwOF1/DOcJ-FxaFrRg4gtDEwOjIwbTowODE7WK?_=lmu7ng919k9',
		// 	'Trans-America': 'http://cf.c.ooyala.com/0ybXJxczrx_JANV3q0a5AQykYyBUSxj0/DOcJ-FxaFrRg4gtDEwOnI5OjBrO-sXix?_=1a9yfz5b3xr',
		// 	'Astrologica': 'http://cf.c.ooyala.com/Zrdmgybjo80V3YUMZtCTUF902GqwnHP8/DOcJ-FxaFrRg4gtDEwOmk2OjBrO6qGv_?_=ijul0izfr',
		// 	'Love-Stories': 'http://cf.c.ooyala.com/lkdXE0czoxKYvf_2Y9c5QP6j_sIBpl9v/DOcJ-FxaFrRg4gtDMwOnI5OjBrO_k5ap?_=xv12afywrk9',
		// 	'Easy-Living-Hacks': 'http://cf.c.ooyala.com/J0YmdndDpoJK1TCXvtUVIJMdleXAdzsh/DOcJ-FxaFrRg4gtDEwOnI5OjBrO-sXix?_=ncj2mjnstt9',
		// 	'Gimme-Five-Healthy-Recipe-Videos' : 'http://cf.c.ooyala.com/VrcTdsdDqH5rTwYdAJyc3hGC2p85JI_F/DOcJ-FxaFrRg4gtDEwOjIwbTowODE7WK?_=3cmhx5hfr',
		// 	'Hang-Time-Jenn-Im' : 'http://cf.c.ooyala.com/pxdGVtcDp_zjrWnl9-aoZvSviQ9NPtf-/DOcJ-FxaFrRg4gtDMwOmk2OjBrO2m1sK?_=ajgb2249529',
		// 	'Beauty-Tutorials' : 'http://cf.c.ooyala.com/Y3OTFsdDoJDT1EhQUylrGA1Uqiandp4b/DOcJ-FxaFrRg4gtDEwOjIwbTowODE7WK?_=uz9676nu3di'
		// };
		//TODO: Fix backupBackgroundImage so it's not flashing before a video
		return(

			<View style={styles.mainContainer}>
			<Image style={styles.imageFallback} source={{uri: 'http:' + this.state.fallbackImage}} />
			<Video source={{uri: this.state.ooyalaVideoUrl}}
				rate={1.0}
				muted={true}
				repeat={true}
				resizeMode='cover'
				style={styles.videoBackground}/>
				
				<View style={styles.colorFilter}>
					<View style={styles.borderBox}>
						<TouchableHighlight onPress={this.handleNextSeries.bind(this, this.state.mapping[this.state.seriesList[0]])} underlayColor="transparent">
							<Text style={styles.nextSeries}>Next Series</Text>
						</TouchableHighlight>
						<TouchableHighlight onPress={this.handleCategory.bind(this, this.state.currentSeries)} underlayColor="transparent">
							<Text style={styles.seriesTitle}>{this.state.nextModel.feed_name}</Text>
						</TouchableHighlight>
						<View style={styles.separator} />
						<TouchableHighlight onPress={this.handleEpisode.bind(this)} underlayColor="transparent">
							<Text style={styles.episode} numberOfLines={2}>WATCH: {this.state.seriesEpisode}</Text>
						</TouchableHighlight>
						<TouchableHighlight onPress={this.handleEpisode.bind(this)} underlayColor="transparent">
							<Image style={{width: 17, height: 17, alignSelf: 'center', resizeMode: 'stretch', marginTop: 9}} source={{uri: 'http://upload.wikimedia.org/wikipedia/commons/0/03/White_arrow_square.png'}} />
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
	seriesSlug: React.PropTypes.string.isRequired, //next series slug, mapped
	nextModel: React.PropTypes.object.isRequired, //entire model of first series
	seriesList: React.PropTypes.array.isRequired, //list of full info series to follow
	mapping: React.PropTypes.object.isRequired //array of models excluding the first
}

module.exports = SeriesLanding;