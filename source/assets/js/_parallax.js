/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.parallax = function() {
  var self = g.parallax;

  // Our selectors
  self.selectors = {
    // The parallax child – our shaker
    plxChild:        "[data-plx='child']",
    // The parallax parent – our mover
    plxParent:       ".no-touch [data-plx='parent']"
  }

  self.variables = {
    offset:         -100,
    windowHeight:   800
  }

  // Variables
  plxSelectors = false;

  // Function to round a number to a specified decimal place
  self.roundToNum = function(num,dec) {    
    return +(Math.round(num + "e+"+dec)  + "e-"+dec);
  }

  // Function to cache selectors
  self.cacheSelectors = function() {
    // Cache the window height for future use
    self.variables.windowHeight = $(window).height();
    // Check if we have any selectors to begin with
    if ($(self.selectors.plxParent).length) {
      // If we do create an empty object
      plxSelectors = {};
      // Loop through them with an index
      var i = 0;
      $(self.selectors.plxParent).each(function() {
        // Cache the $(this) so we can use it again easily
        that = $(this);
        // Create an object within which we’ll store
        var obj = {
          // The parent, as a jQuery selector
          parent: that,
          // The child, as a jQuery selector
          child: that.children(self.selectors.plxChild),
          // And the height – by getting the css height, removing
          // 'px' and making it an integer
          oHeight: parseInt(that.css('height').replace('px',''))
        };
        // Then add that object with the plx-index key to our main object
        plxSelectors['plx-' + i] = obj;
        i++;
      });
    }
  }

  // Update background position
  self.updatePosition = function() {
    // Check to see if we’ve cached any plx selectors
    if (plxSelectors) {
      // If we have, loop through them with an index
      var i = 0;
      for (var key in plxSelectors) {
        // Create an object based on that selector
        var obj = plxSelectors[key],
          // Get the parent and children and set them as variables
          plxParent = obj.parent,
          plxChild = obj.child,
          // Find how far outside or inside the viewport the parent is
          wTop = plxParent[0].getBoundingClientRect().top,
          // Invert it
          wScrolled = parseInt(wTop * -1),
          // Subtract the height of said parent to see how far from the top it is
          wCombined = wScrolled - obj.oHeight;
        // Check that our object is actually within the viewport and if it is:
        if (wScrolled <= obj.oHeight && self.variables.windowHeight >= wTop) {
          // Set the translate as a variable so we can easily apply it with prefixes
          var translate = 'translate3d(0,'+ self.roundToNum((wCombined / 5),2) +'px,0)';
          // Apply these styles to the child
          plxChild.css({
            // For older webkit browsers (remove when enough support is available for unprefixed)
            '-webkit-transform': translate,
            // Standard syntax
            'transform': translate
          });
        }
        i++;
      }
    }

    // Stop ticking
    ticking = false;
  };

  // This will limit the calculation of the background position to
  // 60fps as well as blocking it from running multiple times at once
  self.requestTick = function() {
    if (!ticking) {
      window.requestAnimationFrame(self.updatePosition);
      ticking = true;
    }
  };

  // Set ticking to false to begin with
  ticking = false;

  // Update scroll value and request tick
  self.doScroll = function doScroll() {
    self.requestTick();
  };

  // When the document is ready
  $(document).ready(function() {
    // Cache the selectors
    self.cacheSelectors();
    // And if we have any:
    if (plxSelectors) {
      // Trigger the scroll watch to request a tick
      window.onscroll = self.doScroll;
      // And then run our requestTick so we can see if anything already
      // needs updating
      self.updatePosition();
    }
  });

};