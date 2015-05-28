var React = require('react-native');
var _ = require('underscore');
var helpers = require('../Utils/helpers');

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
		justifyContent: 'center'
	},
	hero: {
		flex: 1,
		flexDirection: 'column',
		height: 380
	},
	heroTitle:{
		fontFamily: 'BrownStd-Regular',
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 20,
		position: 'absolute',
		marginTop: -100,
		backgroundColor: 'transparent'
	},
	heroImg: {
		flex: 1,
	},
	subHeroImg: {
		height: 380,
		flex: 1
	}
});

class Homepage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			entries: this.props.entries,
			numberEntries: this.props.entries.length
		}
	}

	render(){
		console.log('this.state.entries.length', this.state.entries.length);

		var listOfEntries = this.state.entries.map((item, index) => {
				return(
					<View key={index}>
						<View style={styles.hero}>
							<Image style={styles.heroImg} source={{uri: 'http:' + item.main_image.src}}/>
						</View>
						<Text style={styles.heroTitle}>{helpers.formatText(item.title)}</Text>
					</View>
				)

		})
		return(
			<View>
				{listOfEntries}
			</View>
		)
	}
};

Homepage.propTypes = {
	entries: React.PropTypes.array.isRequired,
}

module.exports = Homepage;