/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.heroScroll = function() {
  var self = g.heroScroll;

  self.selectors = {
    mover:          ".no-touch [data-js='mover']",
    body:           "body"
  }

  self.roundToNum = function roundToNum(num,dec) {    
    return +(Math.round(num + "e+"+dec)  + "e-"+dec);
  }

  // Update background position
  self.updatePosition = function updatePosition() {
    // Grab the window height
    var wScrolled = $(window).scrollTop(),
      // Grab the height of the hero
      pHeight = $(self.selectors.mover).height();
    // Check that we're only firing whilst we can actually see the hero
    if (wScrolled <= (pHeight + 100)) {
      // Set the CSS translation based on the plxType defined in the data attributes of the item
      var translate = 'translate3d(0,'+ self.roundToNum(wScrolled / 10,2) +'%,0)';
      // Apply these styles to the child
      $(self.selectors.mover).css({
        // For older webkit browsers (remove when enough support is available for unprefixed)
        '-webkit-transform': translate,
        // Standard syntax
        'transform': translate
      });
    }

    // Stop ticking
    ticking = false;
  };

  // This will limit the calculation of the background position to
  // 60fps as well as blocking it from running multiple times at once
  self.requestTick = function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(self.updatePosition);
      ticking = true;
    }
  };

  // Update scroll value and request tick
  self.doScroll = function doScroll() {
    self.requestTick();
  };

  if ($(self.selectors.mover).length) {
    window.onscroll = self.doScroll;
  }

  var ticking = false;

  $(document).ready(function() {
    if ($(self.selectors.mover).length) {
      self.doScroll;
    }
  });

};