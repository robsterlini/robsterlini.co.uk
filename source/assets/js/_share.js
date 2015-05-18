/**
 * Twitter share button
 */

g.share = function() {
  var self = g.share;

  self.selectors = {
    twitter: '.twitter-popup'
  };

  // Create a nodelist of all of the Twitter buttons
  var twitterButtons = document.querySelectorAll(self.selectors.twitter),
    // Cache the length in case we need to use it later
    twitterButtonsLength = twitterButtons.length
  // Check if we have any of those buttons on this page
  if (twitterButtonsLength) {
    // Loop through all of the Twitter buttons we have
    for (var i = 0, l = twitterButtonsLength; i < l; i++) {
      // When you click on it
      twitterButtons[i].onclick = function() {
        // Cache the this
        var that = this,
          // Set the width and height of the popup window
          width = 575, height = 400,
          // Get the top and left values as half the window height and width
          left = window.innerWidth / 2, top = window.innerHeight / 2,
          // Get the href value from the button
          url = that.getAttribute('href');
          // Set the options based on that bits we grabbed earlier
          opts='status=1'+',width='+width+',height='+height+',top='+top+',left='+left;
        // Open the popup with the url we grabbed, and our newly set options
        window.open(url, 'twitter', opts);
        // Switch the button words out for thanks
        that.innerHTML = 'Thanks!';
        // Stop the button firing as a link should
        return false;
      };
    };
  };

};