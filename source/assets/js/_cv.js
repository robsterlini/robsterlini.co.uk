/**
 * Curriculum vitae
 *
 * Adds the hide and show sections to the CV page
 */

g.cv = function() {
	var self = g.cv;

	self.selectors = {
		shower: "[data-cv-show]",
		hider: 	"[data-cv-hide]",
		toggle: "[data-cv-toggle]"
	}
	
	self.data = {
		shower: "data-cv-show",
		hider: 	"data-cv-hide",
		toggle: "data-cv-toggle"
	}

	self.setHideShowCv = function() {
		// Look for all of the items we want to hide
		var cvHiders = document.querySelectorAll(self.selectors.hider),
			// Cache their length
	    cvHidersLength = cvHiders.length;
    // If we have any to hide
	  if (cvHidersLength) {
	  	// Loop through them
	    for (var i = 0, l = cvHidersLength; i < l; i++) {
	    	// And hide them (via display: none;)
	    	cvHiders[i].style.display = "none";
	    };
	  };
	  // Look for all of the paragraphs that have hidden siblings
	  var cvShowers = document.querySelectorAll(self.selectors.shower),
		  // Cache their length
	    cvShowersLength = cvShowers.length;
    // If we have any to hide
	  if (cvShowersLength) {
	  	// Loop through them
	    for (var i = 0, l = cvShowersLength; i < l; i++) {
	    	// Cache that node
	    	that = cvShowers[i],
		    	// Get the variable that shows it through the data-cv-show attribute
		    	set = that.getAttribute(self.data.shower),
		    	// Create the read more link with said variable
					readMore = '&nbsp;<a class="sc" href="#" ' + self.data.toggle + '="' + set + '">Read more</a>';
				// Attach the link to the end of the paragraph
	    	that.innerHTML = that.innerHTML + readMore;
	    };
	  };
	  // Look for all of the toggles that we've just added in
  	var cvToggles = document.querySelectorAll(self.selectors.toggle),
	  	// Cache their length
	    cvTogglesLength = cvToggles.length;
    // If we have any toggles to add a click event to
	  if (cvTogglesLength) {
	  	// Loop through them
	    for (var i = 0, l = cvTogglesLength; i < l; i++) {
	    	// Attach the on click function
	    	cvToggles[i].onclick = function() {
	    		// Grab the toggle data attribute
	    		var showerData = this.getAttribute(self.data.toggle),
		    		// Create a nodeList of the selectors that we want to show
	    			cvHidersToShow = document.querySelectorAll('[' + self.data.hider + '="' + showerData + '"]'),
	    			// Cache the length
				    cvHidersToShowLength = cvHidersToShow.length;
			    // If we have any
				  if (cvHidersToShowLength) {
				  	// Loop through them
				    for (var i = 0, l = cvHidersToShowLength; i < l; i++) {
				    	// Show them
				    	cvHidersToShow[i].style.display = "block";
				    };
				  };
			    // Remove the read more anchor link from the DOM
				  this.parentNode.removeChild(this);
				  // Prevent it going to the # anchor
	    		return false;
	    	};
	    };
	  };
	};

	self.ready = function() {
		self.setHideShowCv();
	};

	self.ready();

};