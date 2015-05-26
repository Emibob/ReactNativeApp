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
	}
};

module.exports = api;