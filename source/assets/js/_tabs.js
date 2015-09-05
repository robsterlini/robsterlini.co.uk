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
    section: 'tabs__section'
  };

  self.toggleTabs = function() {
  };

  self.addTabClick = function(that) {
    that.onclick = function() {
      // var parent = this.parentElement;
      if (!hasClass(that, self.classes.active)) {
        var currentTab = document.querySelector('.' + self.classes.active);
        removeClass(currentTab, self.classes.active);
        addClass(that, self.classes.active);
        var sections = document.querySelectorAll('.' + self.classes.section),
          sectionsLength = sections.length;
        if (sectionsLength) {
          for (var i = 0, l = sectionsLength; i < l; i++) {
            addClass(sections[i], self.classes.hidden);
          }
        }
        var tabId = that.getAttribute('href').replace('#', ''),
          newTab = document.getElementById(tabId);
        removeClass(newTab, self.classes.hidden);
        console.log(sectionsLength);
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