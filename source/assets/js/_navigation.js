/**
 * Navigation partial
 *
 * Toggles the navigation
 */


g.navigation = function() {
  var self = g.navigation;

  self.selectors = {
    toggle: '[data-toggle="navigation"]'
  }

  self.classes = {
    toggled: 'js--masthead-toggled'
  }

  // Get the toggle
  var toggle = document.querySelector(self.selectors.toggle);
  // Check if we have the toggle
  if (toggle) {
    // If we do add an on click
    toggle.onclick = function(e) {
      // Prevent it from doing anything the button wants
      e.preventDefault();
      // Toggle the toggled class on the body
      toggleClass(document.querySelector('html'), self.classes.toggled);
    };
  };

};