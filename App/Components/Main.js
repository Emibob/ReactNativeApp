var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');
var Entries = require('./Entries');
var helpers = require('../Utils/helpers');
var Video = require('react-native-video');

var {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	ScrollView
} = React;

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		marginTop: 60
	},
	title: {
		marginBottom: 20,
		marginTop: 20,
		fontSize: 25,
		textAlign: 'center',
		color: 'white',
		fontFamily: 'BrownStd-Regular'
	},
	titleSecond:{
		marginBottom: 20,
		marginTop: 20,
		fontSize: 20,
		textAlign: 'center',
		color: '#ccc',
		fontFamily: 'BrownStd-Regular'
	},
	categories: {
		color: '#fff',
		fontFamily: 'BrownStd-Regular',
		fontSize: 20,
		alignSelf: 'center',
		marginTop: 70,
		padding: 10,
		// borderWidth: 2,
		// borderColor: '#fff',
		opacity: 1
	},
	categoryRow: {
		flexDirection: 'row',
		flex: 1,
	},
	largeCategoryItem: {
		flex: 1
	},
	categoryItem: {
		width: 186,
	},
	largeCategoriesImg: {
		width: 376,
		height: 188,
		flex: 1
	},
	categoriesImg: {
		width: 188,
		height: 188
	}
})

class Main extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: '',
			isLoading: false,
		}
	}
	handleChange(event){
		this.setState({
			username: event.nativeEvent.text
		});
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
			.catch((err) => {
				console.log('ERROR: ' + error);
				this.setState({
					error: 'There was an error'
				})
			})
	}
	render(){
		return(

			<View style={styles.mainContainer}>
			<Text style={styles.title}>ENTERTAINMENT</Text>

			<Video source={{uri: 'http://cf.c.ooyala.com/xwbDc2cTpLVpKwBVzQr-6SiY23OJ3Ooi/DOcJ-FxaFrRg4gtDIwOmk2OjBrO97z6k?_=l8azlu9pb9'}}
				rate={1.0}
				muted={true}
				repeat={true}
				resizeMode='cover'
				style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}/>

				<View style={styles.categoryRow}>
					<View style={styles.categoryItem}>
						<TouchableHighlight onPress={this.handleCategory.bind(this, 'movies')}>
							<Image style={styles.categoriesImg} source={{uri: 'http://s2.r29static.com/bin/entry/8ec/220x264,80/1408032/pip-open.jpg'}}>
								<View style={{backgroundColor: '#363380', width:188, height:188, opacity:0.8}}>
									<Text style={styles.categories}>Movies</Text>
								</View>
							</Image>
						</TouchableHighlight>
					</View>
					<View style={styles.categoryItem}>
						<TouchableHighlight onPress={this.handleCategory.bind(this, 'music')}>
							<Image style={styles.categoriesImg} source={{uri: 'http://s3.r29static.com/bin/entry/182/220x264/1404470/weepies-opener-malloryheyer.png'}}>
								<View style={{backgroundColor: '#363380', width:188, height:188, opacity:0.8}}>
									<Text style={styles.categories}>Music</Text>
								</View>
							</Image>
						</TouchableHighlight>
					</View>
				</View>

				<View style={styles.categoryRow}>
					<View style={styles.categoryItem}>
						<TouchableHighlight onPress={this.handleCategory.bind(this, 'tv-shows')}>
							<Image style={styles.categoriesImg} source={{uri: 'http://s1.r29static.com/bin/entry/193/220x264,80/1282582/opener-3.jpg'}}>
								<View style={{backgroundColor: '#363380', width:188, height:188, opacity:0.8}}>
									<Text style={styles.categories}>TV Shows</Text>
								</View>
							</Image>
						</TouchableHighlight>
					</View>
					<View style={styles.categoryItem}>
						<TouchableHighlight onPress={this.handleCategory.bind(this, 'celebrities')}>
							<Image style={styles.categoriesImg} source={{uri: 'http://s2.r29static.com/bin/entry/446/220x264,80/1382981/unnamed.jpg'}}>
								<View style={{backgroundColor: '#363380', width:188, height:188, opacity:0.8}}>
									<Text style={styles.categories}>Celebrities</Text>
								</View>
							</Image>
						</TouchableHighlight>
					</View>
				</View>

				<View style={styles.categoryRow}>
					<View style={styles.categoryItem}>
						<TouchableHighlight onPress={this.handleCategory.bind(this, 'style-out-there')}>
							<Image style={styles.categoriesImg} source={{uri: 'http://s2.r29static.com/bin/entry/254/720x389,80/1307706/image.jpg'}}>
								<View style={{backgroundColor: '#363380', width:188, height:188, opacity:0.8}}>
									<Text style={styles.categories}>Style Out There</Text>
								</View>
							</Image>
						</TouchableHighlight>
					</View>
					<View style={styles.categoryItem}>
						<TouchableHighlight onPress={this.handleCategory.bind(this, 'trans-america')}>
							<Image style={styles.categoriesImg} source={{uri: 'http://s2.r29static.com/bin/entry/e32/314x377,80/1383420/transamerica-opener02.jpg'}}>
								<View style={{backgroundColor: '#363380', width:188, height:188, opacity:0.8}}>
									<Text style={styles.categories}>Trans America</Text>
								</View>
							</Image>
						</TouchableHighlight>
					</View>
				</View>



			</View>

		)
	}
}

module.exports = Main;