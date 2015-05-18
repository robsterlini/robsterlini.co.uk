/**
 * Twitter share button
 */

g.share = function() {
  var self = g.share;

  self.selectors = {
    twitter: '.twitter-popup'
  };

  document.querySelectorAll(self.selectors.twitter)[0].onclick = function() {
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