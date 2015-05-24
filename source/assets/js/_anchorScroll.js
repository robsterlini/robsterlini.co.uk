/**
 * Anchor Scroll partial
 *
 * Allows animated scrolling to anchors, as well as clicking on
 * MD powered title links (without animation)
 */


g.anchorScroll = function() {
  var self = g.anchorScroll;

  self.selectors = {
    hasAnchor:   '[data-anchors] h2[id]',
    anchor: '[data-anchor]'
  }

  // Get a nodeList of all of our anchors that animate on click
  var animatedAnchors = document.querySelectorAll(self.selectors.anchor),
    // Cache the length of those anchors
    animatedAnchorsLength = animatedAnchors.length;
  // Check if we have anchors to animate
  if (animatedAnchorsLength) {
    // Loop through them
    for (var i = 0, l = animatedAnchorsLength; i < l; i++) {
      // Add an on click function
      animatedAnchors[i].onclick = function() {
        // Grab the href and remove the # to get the ID of where we’re scrolling to
        var anchorId = this.getAttribute('href').replace('#', ''),
          // Find the X co-ordinate of where we're off to using its bounding box
          anchorTop = document.getElementById(anchorId).getBoundingClientRect().top;
        // Scroll the body to the found co-ordinate in the given time in ms
        animatedScrollTo(document.body, anchorTop, 300);
        // And then stop it using the link as it would normally
        return false;
      };
    };
  };

  // Get a nodeList of all our title anchors that exist in the body
  var titleAnchors = document.querySelectorAll(self.selectors.hasAnchor),
    // Cache the length of those anchors
    titleAnchorsLength = titleAnchors.length;
  // Check if we have anchors to scroll to
  if (titleAnchorsLength) {
    // Loop through them
    for (var i = 0, l = titleAnchorsLength; i < l; i++) {
      // Add an on click function
      titleAnchors[i].onclick = function() {
        // Grab the id of the title we're clicking on
        var h = this.getAttribute('id');
        // And then set the window hash to that location
        window.location.hash = '';
        window.location.hash = h;
      };
    };
  };

};