var _ = require('underscore');

var api = {
	getBio(username){
		username = username.toLowerCase().trim();
		var url = `https://api.github.com/users/${username}`;
		console.log('URL', url);
		return fetch(url).then((res) => res.json());
	},

	getRepos(username){
		username = username.toLowerCase().trim();
		var url = `https://api.github.com/users/${username}/repos`;
		return fetch(url).then((res) => res.json());
	},

	getNotes(username){
		username = username.toLowerCase().trim();
		var url = `https://github-saver3.firebaseio.com/${username}.json`
		return fetch(url).then((res) => res.json());
	},

	addNote(username, note){
		username = username.toLowerCase().trim();
		var url = `https://github-saver3.firebaseio.com/${username}.json`
		return fetch(url, {
			method: 'post',
			body: JSON.stringify(note)
		}).then((res) => res.json());
	},

	getWellnessStories(subCategory){
		subCategory = subCategory.toLowerCase();
		var url = `http://api.refinery29.com/api/2/feeds/${subCategory}`
		return fetch(url).then((res) => res.json());
	},

	getMoreStories(entryIds){
		var cutIds = entryIds.splice(0,5); //remove IDs we've used
		var stringOfIds = cutIds.join(",");
		var stringOfIds = '?ids=' + stringOfIds;

		var url = `http://api.refinery29.com/api/2/feeds/${stringOfIds}`
		return fetch(url).then((res) => res.json());
	},

	getCoverImage(category){
		var category = category.toLowerCase();
		var url = `http://api.refinery29.com/api/2/feeds/${category}`
		return fetch(url).then((res) => res.json());
	},

	getAllSeriesContent(seriesList){
		var list = seriesList,
				urls = [],
				seriesModel = {};

		for(var i = 0; i < seriesList.length; i++){
			var requestUrl = 'http://api.refinery29.com/api/2/feeds/' + list[i];
			urls.push(requestUrl);
		}

		//return fetch(url).then((res) => res.json());
		return urls;
	},

	getContent(url){
		return fetch(url).then((res) => res.json());
	},

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
	},

	getEntrysById(arrayofEntries, options){ //may get the array card_ids which contain entry:000,singleitem:000,multiitem:000
		var start = options.start || 0,
				size = options.size || 10,
				cardTypes = options.cardTypes || ['entry', 'singleitem', 'multiitem'],
				approvedIds = [],
				i = 0;

		while(approvedIds.length < size){
			if(_.contains(cardTypes, 'entry') && arrayofEntries[i].match(/entry:/g)){ //if we want entry types & it is one
				approvedIds.push(arrayofEntries[i]);
			} 
			if(_.contains(cardTypes, 'singleitem') && arrayofEntries[i].match(/singleitem:/g)){
				approvedIds.push(arrayofEntries[i]);
			} 
			if(_.contains(cardTypes, 'multiitem') && arrayofEntries[i].match(/multiitem:/g)){
				approvedIds.push(arrayofEntries[i]);
			}
			i++
		}

		url = 'http://api.refinery29.com/api/2/feeds/?ids=' + approvedIds.join(',');
		
		return fetch(url).then((res) => res.json());
	}
};

module.exports = api;