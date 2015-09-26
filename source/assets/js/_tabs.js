/**
 * Parallax partial
 *
 * Uses the power of onScreen to parallax all the things!
 */

g.tabs = function() {
  var self = g.tabs;

  self.selectors = {
    tabLink: '[data-js="toggle-tab"]'
  };

  self.data = {
  };

  self.classes = {
    active: 'tabs__nav__link--active',
    hidden: 'tabs__section--hidden',
    faded:  'tabs__section--faded',
    fadeOut: 'tabs__section--fade-out',
    fadeIn:  'tabs__section--fade-in',
    section: 'tabs__section'
  };

  self.toggleTabs = function() {
  };

  self.addTabClick = function(that) {
    that.onclick = function() {
      if (window.innerWidth < 768) {
        scrollToAnchor(this.getAttribute('href').replace('#', ''), 600);
      }
      else {
        if (!hasClass(that, self.classes.active)) {
          var currentTab = document.querySelector('.' + self.classes.active),
            sections = document.querySelectorAll('[data-tab-show]'),
            parent = document.querySelector('.tabs__nav-parent'),
            sectionsLength = sections.length;
          removeClass(currentTab, self.classes.active);
          addClass(that, self.classes.active);
          if (sectionsLength) {
            activeSection = document.querySelector('[data-tab-show="visible"]')
            
            var tabId = that.getAttribute('href').replace('#', ''),
              newTab = document.getElementById(tabId);

            // Get the new tab’s height by removing the hidden class…
            // …grabbing the height of the newly unhidden element…
            // …and then hiding it again
            // removeClass(newTab, self.classes.hidden);
            newTab.setAttribute('data-tab-show', 'visible');
            var newTabHeight = newTab.offsetHeight;
            newTab.setAttribute('data-tab-show', 'hidden');

            // Scroll to the top of the tabs section              
            scrollToAnchor('tabs-nav', 600);

            // Add the faded class to the active section so that it is invisible
            // addClass(activeSection, self.classes.faded);
            addClass(activeSection, self.classes.fadeOut);

            // Apply the set height to the parent to allow it to animate
            parent.style.height = newTabHeight + 'px';

            // addClass(newTab, self.classes.faded);
            setTimeout(function() {

              activeSection.setAttribute('data-tab-show', 'hidden');
              removeClass(activeSection, self.classes.fadeOut);

              // removeClass(newTab, self.classes.hidden);
              addClass(newTab, self.classes.fadeIn);
              newTab.setAttribute('data-tab-show', 'visible');

              parent.style.height = 'auto';
              setTimeout(function() {
                removeClass(newTab, self.classes.fadeIn);
                window.location.hash = tabId;
              }, 250);
            }, 600);
            
          }
        }
      }
      return false;
    }
  };

  self.hideTabInit = function(that, active) {
    var tabId = that.getAttribute('href').replace('#', ''),
      tabSection = document.querySelector('[data-tab="' + tabId + '"]');
    tabSection.setAttribute('data-tab-show', active ? 'visible' : 'hidden');
  };

  self.loopThroughTabs = function() {
    var hash = window.location.hash.substr(1),
      tabs = document.querySelectorAll(self.selectors.tabLink),
      tabsLength = tabs.length;
    if (tabsLength) {
      for (var i = 0, l = tabsLength; i < l; i++) {
        // Add an onClick event
        var thisTab = tabs[i],
          tabId = tabs[i].href.split("#")[1];

        self.addTabClick(thisTab);
        active = hash ? (hash == tabId) : (i === 0);

        if (active) {
          addClass(thisTab, self.classes.active);
        }
        self.hideTabInit(thisTab, active);
      };
    };
  };

  self.ready = function() {
    self.loopThroughTabs();
  };

  self.ready();

};