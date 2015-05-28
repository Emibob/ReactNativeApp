var React = require('react-native');
var helpers = require('../Utils/helpers');
var Video = require('react-native-video');
var Web_View = require('./Helpers/WebView');
var Swiper = require('react-native-swiper');
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
	// imageFallback:{
	// 	position: 'absolute', 
	// 	top: 0, 
	// 	left: 0, 
	// 	right: 0, 
	// 	bottom: 0,
	// 	width: 800,
	// 	height: 800,
	// 	flex: 1,
	// 	resizeMode: 'cover'
	// },
	colorFilter: {
		backgroundColor: '#363380', 
		opacity: 0.8, 
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	borderBox: {
		height: 600, 
		width: 330, 
		borderWidth: 2, 
		borderColor: '#fff', 
		alignSelf: 'center',
		marginTop: 10
	},
	customNav: {
		flexDirection: 'row',
		marginTop: 10,
		alignItems: 'center',
		padding: 0,
		height: 50,
	},
	nextSeries: {
		color: 'white',
		fontFamily: 'BrownStd-Regular', 
		fontSize: 20,
		textAlign: 'right',
		flexDirection: 'row',
		flex: 1,
		alignSelf: 'stretch',
		width: 160,
		paddingRight: 15
	},
	previousSeries: {
		color: 'white',
		fontFamily: 'BrownStd-Regular', 
		fontSize: 20,
		textAlign: 'left',
		flexDirection: 'row',
		flex: 1,
		alignSelf:'stretch',
		width: 160,
		paddingLeft: 15
	},
	seriesTitle: {
		marginTop: 160, 
		color: 'white', 
		fontFamily: 'BrownStd-Regular', 
		fontSize: 25, 
		alignSelf: 'center', 
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	seriesDescription: {
		color: 'white', 
		fontSize: 14, 
		alignSelf: 'center', 
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 10,
		bottom: 0,
		lineHeight: 24
	},
	expand: {
		color: 'white', 
		fontSize: 40, 
		alignSelf: 'center', 
		textAlign: 'center', 
		marginTop: 10
	},
	separator: {
		height: 1,
		backgroundColor: '#fff',
		width: 260,
		alignSelf: 'center',
		marginTop: 10
	},
	swipeDownArrow: {
		width: 26, 
		height: 17,
		alignSelf: 'center',
		marginTop: 240
	},
	wrapper: {

	},
	slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  }
});

var videoUrls = {
	'Style-Out-There': 'http://cf.c.ooyala.com/1qeHV0cTq-oNW3ZdUiLhjve7OPoZwOF1/DOcJ-FxaFrRg4gtDEwOnI5OjBrO-sXix?_=9ictmqs38fr',
	'A-Cut-Above': 'http://cf.c.ooyala.com/UwZG83cjo35S9lWXlwhbXxAiI3TpBl4Z/DOcJ-FxaFrRg4gtDEwOnI5OjBrO-sXix?_=fsxhmdholxr',
	'Easy-Living-Hacks': 'http://cf.c.ooyala.com/J0YmdndDpoJK1TCXvtUVIJMdleXAdzsh/DOcJ-FxaFrRg4gtDEwOnI5OjBrO-sXix?_=bmj8l0daemi',
	'Beauty-Tutorials': 'http://cf.c.ooyala.com/kxMjhydDpdCMBLw1R2KYkxUjlQxknKm_/DOcJ-FxaFrRg4gtDEwOnI5OjBrO-sXix?_=2kdj10pb9',
	'Best-Style-Tips': 'http://cf.c.ooyala.com/80d2pnczrKnQE-Qj0yayZFdXGRcsbG6q/DOcJ-FxaFrRg4gtDEwOnI5OjBrO-sXix?_=k6yymu6jemi',
	'Hang-Time-Jenn-Im': 'http://cf.c.ooyala.com/pxdGVtcDp_zjrWnl9-aoZvSviQ9NPtf-/DOcJ-FxaFrRg4gtDMwOmk2OjBrO2m1sK?_=67zvf6wp14i'
}

class SeriesLanding extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			currentSeriesSlug: this.props.seriesSlug, //Used to hit API for Entries
			allSeriesModels: this.props.allSeriesModels, //Array of ALL series model objects {card_ids, feed_name, full_cards}
			currentModel: this.props.currentModel, //Current series model object
			mapping: this.props.mapping,
			ooyalaVideoUrl: videoUrls[this.props.seriesSlug], //'http://cf.c.ooyala.com/' + this.props.currentModel.full_cards[1].ooyala_video + '/DOcJ-FxaFrRg4gtDEwOjIwbTowODE7WK',
			showDescription: false,
			seriesIndex: this.props.seriesIndex + 1
		}
	}

	componentWillMount(){
		var firstCard = this.state.currentModel.full_cards[1],
				secondCard = this.state.currentModel.full_cards[2];

		this.setState({
			seriesDescription: (this.state.currentModel.full_cards[0].excerpt) ? this.state.currentModel.full_cards[0].excerpt : this.state.currentModel.full_cards[0].meta.description,
			seriesEpisode: (firstCard.meta.title) ? firstCard.meta.title : secondCard.meta.title,
			seriesListOfEntires: this.state.currentModel.full_cards,
			fallbackImage: (firstCard.main_image) ? firstCard.main_image.src : secondCard.main_image.src
		})
	}


	handlePressPlus(){
		if (this.state.showDescription === false){
			this.setState({showDescription: true})
		} else {
			this.setState({showDescription: false})
		}
	}

	openPage(url){
		this.props.navigator.push({
			component: Web_View,
			title: 'Refinery29',
			passProps: {url}
		});
	}

	handleNextSeries(seriesSlug){
		//TODO: Bug - skipping over 1 series
		console.log('this.state.seriesIndex', this.state.seriesIndex);
		console.log('this.state.allSeriesModels.length', (this.state.allSeriesModels.length - 1));

		if(this.state.seriesIndex < (this.state.allSeriesModels.length - 1)){
			this.props.navigator.push({
				component: SeriesLanding,
				title: seriesSlug,
				//onRightButtonPress: this.handleRightButtonPress,
				//onLeftButtonPress: this.handleLeftButtonPress,
				passProps: {
					seriesSlug: seriesSlug, //next series slug, mapped
					currentModel: this.state.allSeriesModels[(this.state.seriesIndex)], //entire model of first remaining series
					allSeriesModels: this.props.allSeriesModels, //shallow copy of all series models
					mapping: this.state.mapping, //array of models excluding the first
					seriesIndex: this.state.seriesIndex
				}
			})
		} else {
			//TODO: remove next button 
			console.log('end of series');
		}
	}

	handlePreviousSeries(seriesSlug){
		//TODO: Handle back to homepage
			this.props.navigator.pop({
				component: SeriesLanding,
				title: seriesSlug,
				passProps: {
					seriesSlug: seriesSlug, //next series slug, mapped
					currentModel: this.state.allSeriesModels[(this.state.seriesIndex - 1)], //entire model of first remaining series
					allSeriesModels: this.props.allSeriesModels, //shallow copy of all series models
					mapping: this.state.mapping, //array of models excluding the first
					seriesIndex: (this.state.seriesIndex - 1)
				}
			})
	}

	buildListOfVideos(){
		var buildVideos = this.state.currentModel.full_cards.map((item, index) => {
			if(item.type === 'VIDEO'){
				return(
					<TouchableHighlight onPress={this.openPage.bind(this, item.canonical)} underlayColor="transparent" key={index}>
					<View style={{flex: 1, flexDirection: 'row', paddingTop: 15, paddingBottom: 15, borderWidth:1, borderColor: '#fff', borderBottomColor:'#ccc'}}>
						<Image style={{flex: 1, width: 90, height: 90, resizeMode: 'stretch', flexDirection: 'row', borderRadius: 45, marginLeft: 20}} source={{uri: 'http:' + item.main_image.src}} />
						<View style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap', width: 280, paddingLeft: 10, paddingRight:30}}>
							<Text style={{flexDirection: 'column', flexWrap: 'wrap', fontSize: 16, fontFamily: 'BrownStd-Regular', marginBottom: 7, color: '#363380', fontWeight: 'bold'}} numberOfLines={2}>{helpers.formatText(item.title)}</Text>
							<Text style={{flexDirection: 'column', flexWrap: 'wrap', fontFamily: 'BrownStd-Regular', fontSize: 12, color: 'black', lineHeight: 16}} numberOfLines={2}>{helpers.formatText(item.meta.description)}</Text>
						</View>
					</View>
					</TouchableHighlight>
				)
			}
		})
		return buildVideos;
	}

	render(){
		var dots = <View style={{backgroundColor:'transparent', width: 5, height: 5,borderRadius: 3, borderWidth:1, borderColor: '#A56CEB', marginLeft: 15, marginRight: 0, marginTop: 3, marginBottom: 3,}} />;
		var activeDots = <View style={{backgroundColor:'#A56CEB', width: 6, height: 6,borderRadius: 3, marginLeft: 15, marginRight: 0, marginTop: 3, marginBottom: 3,}} />;
		
		var list = (this.state.currentModel.full_cards) ? this.buildListOfVideos() : <Text>Oops, no videos here</Text>
		var seriesDescription = (this.state.showDescription) ? <Text style={styles.seriesDescription} numberOfLines={2}>{helpers.formatText(this.state.seriesDescription)}</Text> : <Text style={styles.expand}>+</Text>;
		return(

			<Swiper style={styles.wrapper} 
				horizontal={false}  
				showsButtons={false}
				showsVerticalScrollIndicator={true}
				dot={dots}
				activeDot={activeDots}
				paginationStyle={{height: 122, width: 15}}
				>


			<View style={styles.mainContainer}>
			<Video source={{uri: this.state.ooyalaVideoUrl}}
				rate={1.0}
				muted={true}
				repeat={true}
				resizeMode='cover'
				style={styles.videoBackground}/>
				
				<View style={styles.colorFilter}>
					<View style={styles.borderBox}>

						<View style={styles.customNav}>
							<TouchableHighlight onPress={this.handlePreviousSeries.bind(this, this.state.mapping[this.state.allSeriesModels[this.state.seriesIndex].feed_name])} underlayColor="transparent">
								<Text style={styles.previousSeries}>Back</Text>
							</TouchableHighlight>
							<TouchableHighlight onPress={this.handleNextSeries.bind(this, this.state.mapping[this.state.allSeriesModels[(this.state.seriesIndex)].feed_name])} underlayColor="transparent">
								<Text style={styles.nextSeries}>Next</Text>
							</TouchableHighlight>
						</View>
						
						<TouchableHighlight underlayColor="transparent">
							<Text style={styles.seriesTitle}>{this.state.currentModel.feed_name}</Text>
						</TouchableHighlight>
						<View style={styles.separator} />
						<TouchableHighlight onPress={this.handlePressPlus.bind(this)} underlayColor="transparent">
							{seriesDescription}
						</TouchableHighlight>

						<Image style={styles.swipeDownArrow} source={require('image!swipedownarrow')}/>

					</View>
				</View>
			</View>


				<View style={styles.slide1}>
					<View style={{height: 30}}></View>
          {list}
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>TKTKTK</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>TKTKTKT</Text>
        </View>

			</Swiper>
		)
	}
};

SeriesLanding.propTypes = {
	seriesSlug: React.PropTypes.string.isRequired,
	currentModel: React.PropTypes.object.isRequired,
	mapping: React.PropTypes.object.isRequired,
	seriesIndex: React.PropTypes.number.isRequired
}

module.exports = SeriesLanding;