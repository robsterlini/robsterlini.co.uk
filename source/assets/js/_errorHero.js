/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */


g.errorHero = function() {
  var self = g.errorHero;

  self.selectors = {
    page:    "[data-page='404']",
    mover:   "[data-js='mover']"
  }

  self.images = [
    'colbert.gif',
    'dog-slap.gif'
  ];

  $(document).ready(function() {
    if ($(self.selectors.page).length) {
      $(self.selectors.mover).css('background-image', 'url(/assets/images/hero/404/'+self.images[Math.floor(Math.random()*self.images.length)]+')');
    }
  });

};