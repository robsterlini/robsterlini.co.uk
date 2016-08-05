/**
 * Hero loading partial
 *
 * asyncronously loads the hero image (based on the viewport width)
 */

g.loadHero = function() {
  var self = g.loadHero;

  self.selectors = {
    hero: "[data-hero]"
  }

  self.classes = {
    errorPage: "page--404",
    forbiddenPage: "page--403",
    homePage: "page--home",
    loaded: 'js--hero-loaded'
  }

  self.base = {
    heroUrl: '/assets/images/hero/'
  };

  self.images = {
    home: [
      'hybrid',
      'shades',
      'titanic',
      'triathlon',
      'wetsuit',
      'rdc',
      'medals',
      'highfive',
      'startline',
      'glastonbury',
      'spurs'
    ],
    error: [
      'colbert.gif',
      'dog-slap.gif',
      'mary-poppins.gif',
      'practical-joker.gif',
      'warehouse-long-jump.gif'
    ],
    forbidden: [
      'dwyte.gif'
    ]
  };

  self.randomHero = function(location, array) {
    return location + '/' + array[Math.floor(Math.random()*array.length)];
  }

  self.ready = function() {
    // Cache the hero
    var m = document.querySelectorAll(self.selectors.hero),
      // Grab the window width
      w = window.innerWidth;
    // Check that there is a hero on the page
    mLength = m.length;
    // If we have any
    if (mLength) {
      // Loop through them
      for (var i = 0, l = mLength; i < l; i++) {
        // Check if we’re on the 404 page
        if (hasClass(document.body, self.classes.errorPage)) {
          // If we are set the hero to be set as a randomised item from the self.images array
          var hero = self.randomHero('404', self.images.error);
          
        } else if (hasClass(document.body, self.classes.forbiddenPage)) {
          // If we are set the hero to be set as a randomised item from the self.images array
          var hero = self.randomHero('403', self.images.forbidden);

        } else if (hasClass(document.body, self.classes.homePage)) {
          var hero = self.randomHero('home', self.images.home) + '_full.jpg';

        }
        // If it’s not the 404 page, or we’re smaller than 500px:
        else {
          // Set the hero as the data-hero image, or the data-hero-small if below 500px;
          var hero = m[i].getAttribute('data-hero');
        }
        // Switch out the placeholder hero image for the image
        m[i].style.backgroundImage = 'url(' + self.base.heroUrl + hero + ')';
        // Add the loaded class to reveal it
        addClass(m[i].parentNode, self.classes.loaded);
      };
    };

  };

  self.ready();

};