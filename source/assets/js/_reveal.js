/**
 * Reveal partial
 *
 */

g.reveal = function() {
  var self = g.reveal;

  self.selectors = {
    revealClass:      ".js--reveal",
    revealData:       "[data-reveal]",
    revealImage:      "[data-js='lazy-load-image']"
  };

  self.data = {
    revealImage:  "lazy-load-image",
    source:       "data-src"
  };

  self.classes = {
    revealHide:     "js--hidden",
    revealShow:     "js--show",
    loaded:         "image--loaded",
    parentLoaded:   "figure--loaded"
  };

  var onScreen = new OnScreen();

  self.reveal = function() {
    var revealers = self.selectors.revealImage
      revealers +=  ', ' + self.selectors.revealData,
      revealers +=  ', ' + self.selectors.revealClass;
    [].forEach.call(document.querySelectorAll(revealers), function(element, i) {
      addClass(element, self.classes.revealHide);
      onScreen.addItem(element, {
        screen: {
          bottom: (parseFloat(element.getAttribute("data-js") === self.data.revealImage ? 0 : element.getAttribute('data-reveal') || 0.333) * 100) + '%'
        },
        screenEnterClass: self.classes.revealShow,
        screenLeaveClass: self.classes.revealShow,
        onScreenEnter: function(detail) {
          if (element.getAttribute("data-js") === self.data.revealImage) {
            if (!hasClass(element, self.classes.loaded)) {
              element.setAttribute('src', element.getAttribute(self.data.source));
              setTimeout(function() {
                addClass(element, self.classes.loaded);
                addClass(element.parentElement, self.classes.parentLoaded);
              }, 250);  
            }
          };
        },
        disableScreenMove: true
      });
    });
  };

  self.setBaseline = function() {
    var img = document.querySelector('img');
    if (img) {
      baseline('img', 12);
    }
  }

  self.ready = function() {
    self.reveal();
    onScreen.update();
    self.setBaseline();
  };

  self.ready();

};