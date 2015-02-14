/**
 * Hero loading partial
 *
 * asyncronously loads the hero image (based on the viewport width)
 */


g.loadHero = function() {
  var self = g.loadHero;

  self.selectors = {
    // Hero background
    mover:      "[data-js='mover']"
  }

  self.classes = {
    // 404 page identifier
    errorPage:  "x404"
  }

  self.images = [
    'colbert.gif',
    'dog-slap.gif'
  ];

  $(document).ready(function() {
    // Cache the mover
    var m = $(self.selectors.mover),
      // Grab the window width
      w = $(window).width();
    // Check that there is a hero on the page
    if (m.length) {
      // Check if we’re on the 404 page and bigger than 500px wide
      if ($('body').hasClass(self.classes.errorPage) && w > 500) {
        // If we are set the hero to be set as a randomised item from the self.images array
        var hero = '404/' + self.images[Math.floor(Math.random()*self.images.length)];
      }
      // If it’s not the 404 page, or we’re smaller than 500px:
      else {
        // Set the hero as the data-hero image, or the data-hero-small if below 500px;
        var hero = m.attr(w > 500 ? 'data-hero' : 'data-hero-small');
      }
      // Switch out the placeholder hero image for the image
      m.css('background-image', 'url(/assets/images/hero/'+hero+')');
    }
  });

};