module.exports = {
	sentenceCase: function(value) {
		return (value + '').replace(/^[a-z]/, letter => letter.toUpperCase());
	}
};
