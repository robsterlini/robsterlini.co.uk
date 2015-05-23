/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.hotspurRelated = function() {
  var self = g.hotspurRelated;

  self.selectors = {
    refreshToggle:   '[data-refresh]',
    refreshParent:   '[data-js="refresh-parent"]',
    refreshWaypoint: '[data-js="refresh-waypoint"]'
  }
  self.classes = {
    refresh:  'hotspur__refresh--'
  }

  // self.requestWpSet = function() {
  //   if ($(self.selectors.refreshWaypoint).length) {
  //     $(self.selectors.refreshWaypoint).waypoint(function(direction) {
  //       self.toggleRefresh(direction == 'down' ? 'new' : 'old');
  //     }, { offset: '50%' });
  //   }
  // }

  self.toggleRefresh = function(oldNew) {
    var opposite = oldNew == 'new' ? 'old' : 'new';
    $(self.selectors.refreshParent).removeClass(self.classes.refresh+opposite).addClass(self.classes.refresh+oldNew);
  }

  $(document).on('click', self.selectors.refreshToggle, function(e) {
    e.preventDefault();
    var oldNew = $(this).attr('data-refresh');
    self.toggleRefresh(oldNew);
  });

  // $(document).ready(function() {
  //   self.requestWpSet();
  // });

};