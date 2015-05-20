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

	self.classes = {
		touch: 'touch',
		hover: 'hover'
	}

	self.ready = function() {
		// Cache the HTML element
		var b = document.documentElement;
		// Set the data-useragent and the data-platform on the HTML
		b.setAttribute('data-useragent',  navigator.userAgent);
		b.setAttribute('data-platform', navigator.platform);
		// If touch is enabled (via modernizr) remove the hover class
		if (hasClass(b, self.classes.touch)) {
			removeClass(b, self.classes.hover);
		}
	};

	self.ready();

};