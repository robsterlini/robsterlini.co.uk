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
		// Grab all of the elements with the strike class
	  var strikes = document.querySelectorAll(self.selectors.spanToStrike),
		  // Cache the length in case we need to use it later
	    strikesLength = strikes.length;
    // If we have strikes that exist execute the loop
	  if (strikesLength) {
	  	// Loop through each strike
	    for (var i = 0, l = strikesLength; i < l; i++) {
	    	// Cache this particular strike
	    	var that = strikes[i],
		    	// Grab the text content
	    		text = that.innerText,
	    		// Split it into separate words
	    		words = text.split(" "),
	    		// Cache the length of that array
	    		wordsLength = words.length,
	    		// And empty the set text
	    		setText = '';
	    	// Loop through the words array
	    	for (w = 0; w < wordsLength; w++) {
	    		// If it’s the not the last item in the array, use a space to separate them
	    		var space = w == (wordsLength - 1) ? '' : ' ';
	    		// Create that words span with the class and space separator
	    		setText += "<span class='" + self.classes.strikethrough + "'>" + words[w] + space + "</span>"
	    	};
	    	// Change the strike’s inner text to our new span based string
	    	that.innerHTML = setText;
			}
		}
	};

	self.ready();

};