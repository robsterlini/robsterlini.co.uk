/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.cv = function() {
	var self = g.cv;

	self.selectors = {
		shower: "[data-cv='show']",
		hider: "[data-cv='hide']",
		toggle: "[data-cv='toggle']"
	}

	self.classes = {
		cvHidden: "cv__copy--hidden"
	}

	self.hideShowCv = function() {
		var readMore = '&nbsp;<a class="sc" href="#" data-cv="toggle">Read more</a>';
		$(self.selectors.hider).each(function() {
			$(this).hide();
		});
		$(self.selectors.shower).each(function() {
			$(this).append(readMore);
		});
	}

	$('body').on('click', self.selectors.toggle, function(e) {
		e.preventDefault();
		console.log('test');
		var that = $(this),
			parent = that.parent(),
			siblings = parent.nextUntil(":not(" + self.selectors.hider + ")");
		that.remove();
		siblings.show();
	});

	$(document).ready(function() {
		self.hideShowCv();
	});


};