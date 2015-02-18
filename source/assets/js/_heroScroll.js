/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.heroScroll = function() {
  var self = g.heroScroll;

  self.selectors = {
    mover:          ".no-touch [data-js='mover']",
    plxParent:       ".no-touch [data-js='plx-parent']",
    body:           "body"
  }

  self.roundToNum = function roundToNum(num,dec) {    
    return +(Math.round(num + "e+"+dec)  + "e-"+dec);
  }

  // Update background position
  self.updatePosition = function updatePosition() {
    // Check if the hero exists
    if ($(self.selectors.mover).length) {
      // Grab the window height
      var wScrolled = $(window).scrollTop(),
        // Cache the mover selector
        mover = $(self.selectors.mover),
        // Grab the height of the hero
        pHeight = mover.height();
      // Check that we're only firing whilst we can actually see the hero
      if (wScrolled <= (pHeight + 100)) {
        // Set the CSS translation based on the plxType defined in the data attributes of the item
        // var translate = 'translate3d(0,'+ self.roundToNum((wScrolled / 10),2) +'%,0)'; 
        var translate = 'translate3d(0,'+ self.roundToNum((wScrolled / 5),2) +'px,0)';
        // Apply these styles to the child
        mover.css({
          // For older webkit browsers (remove when enough support is available for unprefixed)
          '-webkit-transform': translate,
          // Standard syntax
          'transform': translate
        });
      }
    }
    if ($(self.selectors.plxParent).length) {
      $(self.selectors.plxParent).each(function() {
        var that = $(this),
          wHeight = that.height(),
          wScrolled = parseInt(this.getBoundingClientRect().top * -1),
          wCombined = wScrolled - wHeight,
          translate = 'translate3d(0,'+ self.roundToNum((wCombined / 5),2) +'px,0)';
        // Apply these styles to the child
        that.children('[data-js="plx-mover"]').css({
          // For older webkit browsers (remove when enough support is available for unprefixed)
          '-webkit-transform': translate,
          // Standard syntax
          'transform': translate
        });
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

  if ($(self.selectors.mover).length || $(self.selectors.plxMover).length) {
    window.onscroll = self.doScroll;
  }

  var ticking = false;

  $(document).ready(function() {
    if ($(self.selectors.mover).length) {
      self.doScroll;
    }
  });

};