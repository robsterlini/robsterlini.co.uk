/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.browserSniff = function() {
	var self = g.browserSniff;

	self.selectors = {
		html: "html"
	}

	var b = document.documentElement;
	b.setAttribute('data-useragent',  navigator.userAgent);
	b.setAttribute('data-platform', navigator.platform);

	$(document).ready(function() {
		if ($(self.selectors.html).hasClass('touch')) {
			$(self.selectors.html).removeClass('hover');
		}

		$('.strike').each(function() {
			var that = $(this),
				text = that.text(),
				words = text.split(" "),
				setText = '';
			that.empty().attr('title', text);
			$.each(words, function(i, v) {
				var setClass = v.length < 2 ? 'tiny' : v.length > 3 ? 'long' : 'short',
					space = i == (words.length - 1) ? '' : ' ';
		    setText += "<span class='strike__strikethrough--" + setClass + "'>" + v + space + "</span>";
			});
			that.append(setText);
		});
	})


};