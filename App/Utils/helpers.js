var helpers = {
	formatText(str){
		return str.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#039;/g, "'")
			.replace(/&mdash;/g, "—")
			.replace(/<em>/g, "")
			.replace(/<\/em>/g, "");
	},
	formatTitle(str){
		return str.replace(/-/g, ' ').toUpperCase();
	}
}

module.exports = helpers;