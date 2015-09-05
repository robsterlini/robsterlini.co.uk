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
    section: 'tabs__section'
  };

  self.toggleTabs = function() {
  };

  self.addTabClick = function(that) {
    that.onclick = function() {
      if (!hasClass(that, self.classes.active)) {
        var currentTab = document.querySelector('.' + self.classes.active),
          sections = document.querySelectorAll('.' + self.classes.section),
          sectionsLength = sections.length;
        removeClass(currentTab, self.classes.active);
        addClass(that, self.classes.active);
        if (sectionsLength) {
          for (var i = 0, l = sectionsLength; i < l; i++) {
            if (!hasClass(sections[i], self.classes.hidden)) {
              activeSection = sections[i];
            }
          }
          
          var tabId = that.getAttribute('href').replace('#', ''),
            newTab = document.getElementById(tabId);
          scrollToAnchor('tabs-nav', 600);
          addClass(activeSection, self.classes.faded);
          addClass(newTab, self.classes.faded);
          setTimeout(function() {
            addClass(activeSection, self.classes.hidden);
            removeClass(newTab, self.classes.hidden);
            setTimeout(function() {
              removeClass(newTab, self.classes.faded);
            }, 300);
          }, 600);
          
        }
      }
      return false;
    };
  };

  self.hideTabInit = function(that, active) {
    if (!active) {
      var tabId = that.getAttribute('href').replace('#', ''),
        tabSection = document.querySelector('[data-tab="' + tabId + '"]');
      addClass(tabSection, self.classes.hidden);
    }
  };

  self.loopThroughTabs = function() {
    var tabs = document.querySelectorAll(self.selectors.tabLink),
      tabsLength = tabs.length;
    if (tabsLength) {
      for (var i = 0, l = tabsLength; i < l; i++) {
        // Add an onClick event
        var thisTab = tabs[i],
          active = hasClass(thisTab, self.classes.active);
        self.addTabClick(thisTab, active);
        self.hideTabInit(thisTab, active);
      };
    };
  };

  self.ready = function() {
    self.loopThroughTabs();
  };

  self.ready();

};