/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.hotspurRelated = function() {
  var self = g.hotspurRelated;

  self.selectors = {
    refreshToggle:   '[data-refresh]',
    refreshParent:   '[data-js="refresh-parent"]'
  }
  self.classes = {
    refresh:  'hotspur__refresh--'
  }

  self.toggleRefresh = function(oldNew) {
    // Grab the opposite of the variable passed
    var opposite = oldNew == 'new' ? 'old' : 'new',
      // Cache the parent we'll assign the class to
      parent = document.querySelectorAll(self.selectors.refreshParent)[0];
    // Remove the opposite one
    removeClass(parent, self.classes.refresh+opposite);
    // And add the new one
    addClass(parent, self.classes.refresh+oldNew);
  };
  // Grab the nodeList of all of our refreshToggles
  var refreshToggles = document.querySelectorAll(self.selectors.refreshToggle),
    // Cache their length
    refreshTogglesLength = refreshToggles.length;
  // If the exist
  if (refreshTogglesLength) {
    // Loop through them
    for (var i = 0, l = refreshTogglesLength; i < l; i++) {
      // And on click
      refreshToggles[i].onclick = function() {
        // Grab the data-refresh attribute
        var oldNew = this.getAttribute('data-refresh');
        // And throw the toggleRefresh() function at it
        self.toggleRefresh(oldNew);
        // Also stop it from heading up to anchor #
        return false;
      };
    };
  };

};