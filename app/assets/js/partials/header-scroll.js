/**
 * Demo JS Partial
 *
 * Each partial bit of JavaScript code will live in it's own partial
 * and will become a method (function) associated with the global g
 * object.
 */

g.headerScroll = function() {
  var self = g.headerScroll;
  self.selectors = {
    scrollTrigger:  "[data-js='scroll-trigger']",
    headerToOffset: "[data-js='header-to-offset']"
  }

  self.classes = {
    scrolled:  "masthead--scrolled"
  }

  self.toggleScroll = function toggleScroll() {
    var scrolled = $(window).scrollTop();
    if (!$(self.selectors.scrollTrigger).hasClass(self.classes.scrolled) && scrolled > 250) {
      $(self.selectors.scrollTrigger).addClass(self.classes.scrolled);
    }
    else if ($(self.selectors.scrollTrigger).hasClass(self.classes.scrolled) && scrolled < 250) {
      $(self.selectors.scrollTrigger).removeClass(self.classes.scrolled);
    }
  }
  var throttled = _.throttle(self.toggleScroll,250);
  $(window).scroll(throttled);

  $(document).ready(function() {
    self.toggleScroll();
  });
  
};