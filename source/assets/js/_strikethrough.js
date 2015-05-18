/**
 * Strikethrough partial
 *
 * Impelements markup across each item in a sentence to allow us to style
 * it with a lovely red strikethrough.
 */

g.strikethrough = function() {
	var self = g.strikethrough;

	self.selectors = {
		spanToStrike: ".strike"
	}
	self.classes = {
		strikethrough: "js--strike"
	}

	self.ready = function() {
	  var strikes = document.querySelectorAll(self.selectors.spanToStrike),
	    strikesLength = strikes.length;
	  if (strikesLength) {
	    for (var i = 0, l = strikesLength; i < l; i++) {
	    	var that = strikes[i],
	    		text = that.innerText,
	    		words = text.split(" "),
	    		wordsLength = words.length,
	    		setText = '';

	    	for (w = 0; w < wordsLength; w++) {
	    		var space = i == (wordsLength - 1) ? '' : ' ';
	    		setText += "<span class='" + self.classes.strikethrough + "'>" + words[w] + space + "</span>"
	    	};

	    	that.innerHTML = setText;
	    	that.setAttribute('title', text);
			}
		}
	};

};