/**
 * Parallax partial
 *
 * Uses the power of onScreen to parallax all the things!
 */

g.onScreenSetup = function() {
  var self = g.onScreenSetup;

  self.selectors = {
    plxChild:         "[data-plx='child']",
    plxParent:        ".no-touch [data-plx='parent']",
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

  self.prefixes = [
    'webkitTransform',
    'msTransform',
    'transform'
  ];

  self.vars = {
    tabFixed: false
  };

  plxSelectors = false;

  var onScreen = new OnScreen();

  self.parallax = function() {
    if (window.innerWidth < 768) return;
    [].forEach.call(document.querySelectorAll(self.selectors.plxParent), function(section) {
      var background = section.querySelector(self.selectors.plxChild);
      if (background) {
        onScreen.addItem(section, {
          onScreenMove: function(detail) {
            var offset = detail.offset.outside.bottom,
              position = linear(offset, 0, 1, 1),
              translate = roundToNum(position * 25, 3);
            self.prefixes.forEach(function(property) {
              background.style[property] = 'translate3d(0,' + translate + '%, 0)';
            });
          }
        });
      };
    });
  };

  self.header = function() {
    var blogMarker = document.querySelector('[data-js="header-to-offset"]'), // Change me
      header = document.querySelector('#menu'); // Change me
      if (blogMarker && header) {
        onScreen.addItem(blogMarker, {
          screen: {
            top: '50%',
            bottom: '50%',
          },
          // target: {
            // top: '50%',
            // bottom: '50%'
          // },
          onScreenLeave: function(detail) {
            console.log('leave', detail);
            if (detail.side == 'bottom') {
              removeClass(header, 'js--header-active');
            }
            return false;
          },
          onScreenEnter: function(detail) {
            console.log('enter', detail);
            addClass(header, 'js--header-active');
            return false;
          },
          disableScreenMove: true
        });
      }
  }

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

  self.createHeaderLink = function(text, opts) {
    var classSet = "article__fixed-header__link",
      str = opts ?
      '<a class="' + classSet + '" href="' + opts.url + '" title="' + opts.title + '">' + text.arrow + '<span class="visuallyhidden"> ' + text.labelText + ' article: ' + opts.title + '</span></a>'
    : '<div class="' + classSet + '">' + text.arrow + '</div>';
    return str;
  }

  // self.setupBlogHeader = function() {
  //   var headerInsert = document.querySelector(self.selectors.blogHeader);
  //   if (headerInsert && articles) {
  //     var blogHeader = document.createElement('div'),
  //       waypointMarker = document.createElement('span'),
  //       blogTitle = document.querySelector(self.selectors.blogTitle),
  //       blogHeaderHtml =  '<div class="group">';
  //       blogHeaderHtml +=   '<h1 class="sc"><span>You&rsquo;re reading </span>' + blogTitle.innerText + '</h1>'
  //       blogHeaderHtml +=   '<div class="article__fixed-header__links">';
  //       blogHeaderHtml +=     self.createHeaderLink({arrow: '&larr;', labelText: 'Previous'}, articles.prev);
  //       blogHeaderHtml +=     self.createHeaderLink({arrow: '&rarr;', labelText: 'Next'}, articles.nextUp);
  //       blogHeaderHtml +=   '</div>';
  //       blogHeaderHtml += '</div>';
  //     blogHeader.className = 'article__fixed-header';
  //     blogHeader.dataset.js = 'fixed-header';
  //     blogHeader.innerHTML = blogHeaderHtml;
  //     waypointMarker.className = 'visuallyhidden js-screenleave'
  //     waypointMarker.dataset.js = 'show-header'
  //     waypointMarker.setAttribute("aria-hidden", "true");
  //     headerInsert.insertBefore(blogHeader, headerInsert.firstChild);
  //     headerInsert.insertBefore(waypointMarker, headerInsert.firstChild);

  //     var blogMarker = document.querySelector(self.selectors.blogMarker);
  //     if (blogMarker) {
  //       onScreen.addItem(blogMarker, {
  //         screen: {
  //           top: '-10%'
  //         },
  //         disableScreenMove: true
  //       });
  //     }
  //   };
  // };

  // self.setupTabs = function() {
  //   var tabsMarker = document.querySelector(self.selectors.tabs.marker),
  //     tabsNav = document.querySelector(self.selectors.tabs.navWrapper);
  //   if (tabsMarker) {
  //     // addClass(self.selectors.tabs.navWrapper, self.classes.tabs.fixed);
  //     onScreen.addItem(tabsMarker, {
  //       screen: {
  //         top: 0
  //       },
  //       fireScreenMoveOffScreen: true,
  //       onScreenMove: function(detail) {
  //         var offset = detail.offset.top;
  //         if (offset > 0) {
  //           if (self.vars.tabFixed) {
  //             self.vars.tabFixed = false;
  //             removeClass(tabsNav, self.classes.tabs.fixed);
  //           }
  //         } else {
  //           if (!self.vars.tabFixed) {
  //             self.vars.tabFixed = true;
  //             addClass(tabsNav, self.classes.tabs.fixed);
  //           }
  //         }
  //       }
  //     });
  //   }
  // };

  self.ready = function() {
    self.parallax();
    self.reveal();
    // self.setupBlogHeader();
    // self.setupTabs();
    self.header();
    onScreen.update();
  };

  self.ready();

};