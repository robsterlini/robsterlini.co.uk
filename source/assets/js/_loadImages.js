/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.loadImages = function() {
	var self = g.loadImages;

	self.selectors = {
		toLoad: "[data-js='lazy-load-image']",
    headerParent:   "[data-js='header-parent']",
    currentHeader:  "[data-js='page-header']",
    fixedHeader:    "[data-js='fixed-header']"
	}

	self.classes = {
		loaded:         "image--loaded",
		parentLoaded:   "figure--loaded",
    journal:        'journal_',
    headerToggled:  'article__fixed-header--toggled'
	}

	self.data = {
		source: "data-src"
	}

	self.wpSet = function() {
    if ($(self.selectors.toLoad).length) {
      $(self.selectors.toLoad).waypoint(function(direction) {
        if (!$(this).hasClass(self.classes.loaded)) {
          $(this).attr('src',$(this).attr(self.data.source)).load(function() {
          	$(this).addClass(self.classes.loaded).parent().addClass(self.classes.parentLoaded);
            wpSet();
          });
        }
      }, { offset: '75%' });
    }
  }

  self.wpHeaderSet = function() {
    $(self.selectors.headerParent).waypoint(function(direction) {
      if (direction == 'down') {
        $(self.selectors.fixedHeader).addClass(self.classes.headerToggled);
      }
      else {
        $(self.selectors.fixedHeader).removeClass(self.classes.headerToggled);
      }
    }, { offset: '0%' });
  }

  self.wpInit = function wpInit() {
    if ($('body[class*=" ' + self.selectors.journal + '"]').length) {
      var headerToInsert =  '<div class="article__fixed-header" data-js="fixed-header">';
        headerToInsert +=   '<div class="group">',
        headerToInsert +=   '<h1 class="sc"><span>You&rsquo;re reading </span>' + $(self.selectors.currentHeader).text() + '</h1>',
        headerToInsert +=   '</div></div>';
      $(self.selectors.headerParent).before(headerToInsert);
      self.wpHeaderSet();
    }
    if ($('body').hasClass('triathlon')) {
      self.wpHeaderSet();
    }
  }

	$(document).ready(function() {
    self.wpInit();
    self.wpSet();
  });

};