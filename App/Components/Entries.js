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
		color: '#000',
		fontFamily: 'BrownStd-Regular',
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	rowContainer: {
		flexDirection: 'row',
		flex: 1,
		paddingTop: 10,
		paddingBottom: 10,
	},
	entryTitle: {
		fontFamily: 'PlayFairDisplay-Bold',
		fontWeight: 'bold',
		color: '#000',
		fontSize: 16,
		paddingBottom: 5,
	},
	entryDate: {
		color: '#f75352',
		fontSize: 12,
		paddingBottom: 3,
		fontWeight: 'bold',
		fontFamily: 'BrownStd-Regular',
	},
	entryDescription: {
		fontSize: 14,
		paddingBottom: 5,
		fontFamily: 'BrownStd-Regular',
		lineHeight: 20,
		paddingTop: 10
	},
	entryImg: {
		width: 150,
		height: 190,
		resizeMode: 'contain',
		flexDirection: 'row',
	},
	entryInfo: {
		flexWrap: 'wrap',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
	},
	moreStoriesButton: {
		flex: 1,
		marginTop: 20,
		marginBottom: 20,
		color: '#6ad98a',
		fontFamily: 'BrownStd-Regular',
		fontSize: 20,
		textAlign: 'center'
	},
	colorBarContainer: {
		flex: 1,
		height: 10,
		flexDirection: 'row',
		marginBottom: 20
	},
	colorBarBlack: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#000'
	},
	colorBarPink: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#f75352'
	},
	colorBarGreen: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#6ad98a'
	},
	colorBarBlue: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#363380'
	},
	colorBarAqua: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#4fe5d9'
	}
});

class Entries extends React.Component{
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
			title: 'Web View',
			passProps: {url}
		});
	}
	loadMoreStories(){
		var moreEntries = this.state.moreEntries;
		api.getMoreStories(moreEntries)
			.then((res) => {
				this.setState({
					currentStories: res,
					moreEntries: this.state.moreEntries
				})
			})
	}
	buildNewStories(entries){
		var moreList = entries.map((item, index) => {
			if(entries[index].sections && entries[index].main_image){
			return (
				<View key={index}>
					<View style={styles.rowContainer}>
						<Image style={styles.entryImg} source={{uri: 'http:' + entries[index].main_image.src}} />
					
						<View style={styles.entryInfo}>
							<TouchableHighlight
								onPress={this.openPage.bind(this, entries[index].canonical)}
								underlayColor='transparent'>
								<Text style={styles.entryTitle} numberOfLines={3}>{helpers.formatText(entries[index].title)}</Text>
							</TouchableHighlight>
							<Text style={styles.entryDate}>{entries[index].published_formatted}</Text>
							<Text style={styles.entryDescription} numberOfLines={4}>{helpers.formatText(entries[index].meta.description)}</Text>
						</View>

					</View>
				</View>
			)
		}
		})

		return(
			<View>
				{moreList}
			</View>
		)
	}
	render(){
		var more = (!this.state.currentStories) ? <TouchableHighlight onPress={this.loadMoreStories.bind(this)}><Text style={styles.moreStoriesButton}>More Stories</Text></TouchableHighlight> : this.buildNewStories(this.state.currentStories.result);
		var list = this.buildNewStories(this.props.entries.result.full_cards);

		return(
			<ScrollView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{helpers.formatTitle(this.props.subcat)}</Text>
					<View style={styles.colorBarContainer}>
						<View style={styles.colorBarBlack}></View>
						<View style={styles.colorBarPink}></View>
						<View style={styles.colorBarGreen}></View>
						<View style={styles.colorBarBlue}></View>
						<View style={styles.colorBarAqua}></View>
					</View>
				</View>
				{list}

				{more}
			</ScrollView>
		)
	}
};

Entries.propTypes = {
	entries: React.PropTypes.object.isRequired
}

module.exports = Entries;