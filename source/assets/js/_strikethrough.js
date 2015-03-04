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
		strikethroughPrefix: "strike__strikethrough--"
	}

	$(document).ready(function() {
		$(self.selectors.spanToStrike).each(function() {
			var that = $(this),
				text = that.text(),
				words = text.split(" "),
				setText = '';
			that.empty().attr('title', text);
			$.each(words, function(i, v) {
				var setClass = v.length < 2 ? 'tiny' : v.length > 3 ? 'long' : 'short',
					space = i == (words.length - 1) ? '' : ' ';
		    setText += "<span class='" + self.classes.strikethroughPrefix + setClass + "'>" + v + space + "</span>";
			});
			that.append(setText);
		});
	})

};