/**
 * Hero loading partial
 *
 * asyncronously loads the hero image (based on the viewport width)
 */

g.loadHero = function() {
  var self = g.loadHero;

  self.selectors = {
    hero:      "[data-hero]"
  }

  self.classes = {
    errorPage:  "x404"
  }

  self.images = [
    'colbert.gif',
    'dog-slap.gif',
    'mary-poppins.gif',
    'practical-joker.gif',
    'warehouse-long-jump.gif'
  ];

  self.ready = function() {
    // Cache the hero
    var m = document.querySelectorAll(self.selectors.hero),
      // Grab the window width
      w = window.innerWidth
    // Check that there is a hero on the page
    if (m.length) {
      // Check if we’re on the 404 page and bigger than 500px wide
      if (hasClass(document.body, self.classes.errorPage) && w > 500) {
        // If we are set the hero to be set as a randomised item from the self.images array
        var hero = self.images[Math.floor(Math.random()*self.images.length)];
      }
      // If it’s not the 404 page, or we’re smaller than 500px:
      else {
        // Set the hero as the data-hero image, or the data-hero-small if below 500px;
        var hero = m[0].getAttribute(w > 500 ? 'data-hero' : 'data-hero-small');
      }
      // Set the location (normally used in the blog assets)
      var location = m[0].getAttribute('data-location');
      // Switch out the placeholder hero image for the image
      m[0].style.backgroundImage = 'url(' + location + hero + ')';
    }

  };

};