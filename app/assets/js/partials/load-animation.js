/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.loadAnimation = function() {
  var self = g.loadAnimation;

  self.selectors = {
    html: "html"
  }
  self.classes = {
    start:  'animate--start',
    end:    'animate--end'
  }

  $(document).ready(function() {
    $(self.selectors.html).addClass(self.classes.start);
  });
  $(window).load(function () {
    $(self.selectors.html).addClass(self.classes.end);
  });

};