/**
 * Anchor Scroll partial
 *
 * Allows animated scrolling to anchors
 */


g.anchorScroll = function() {
  var self = g.anchorScroll;

  self.selectors = {
    hasAnchor:   '[data-anchors] h2[id]',
    anchor: '[data-anchor]'
  }

  $(document).on('click', self.selectors.hasAnchor + ', ' + self.selectors.anchor, function(e) {
    e.preventDefault();
    that = $(this);
    var id = that.attr('id') || that.attr('href').replace('#','');
    if (id) {
      self.scrollTo(id, that.attr('href') ? false : true);
    }
  });

  self.scrollTo = function(id, hash) {
    var h = '#'+id;
      console.log(hash);
      if(history.pushState) {
        self.animateScroll(id, h);
        if (hash == true) {
          history.pushState(null, null, h);
        }
        else {
          history.pushState(null, null, '#');
        }

      }
      else {
        window.location.hash = h;
      }
    // }
    // else {
    //   self.animateScroll(id, h);
    // }
  }

  self.animateScroll = function(id, hash) {
   $('html,body').animate({
      scrollTop: $(hash).offset().top + 10
    }, 1000);
  }

};