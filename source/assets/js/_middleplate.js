/**
 * Hero loading partial
 *
 * asyncronously loads the hero image (based on the viewport width)
 */


g.middleplate = function() {
  var self = g.middleplate;

  self.selectors = {
    indexHeader:        "[data-js='middleplate-header']",
    checkboxCompletion: "[data-js='mp-checklist-completion']",
    checkboxItem:       "[data-js='mp-checklist-item']",
    checkboxCurrent:    "[data-js='mp-checklist-current']",
    checkboxTotal:      "data-check-list-total"
  }

  self.classes = {
    checkboxSelected: "mp-checkbox__link--selected",
    checkboxComplete: "mp-checkbox__completion--complete"
  }

  self.titles = [
    'Middleplate',
    'Mddlplt',
    'Middlepl8',
    'M1DDL3PL4T3'
  ];

  self.mpChangeTitle = function() {
    // Get the first selector from the nodeList of the header element
    var header = document.querySelectorAll(self.selectors.indexHeader)[0];
    // Check if one exists
    if (header) {
      // Grab one of the title from the array at random
      var text = self.titles[Math.floor(Math.random()*self.titles.length)];
      // Change out the text for our new randomised text
      header.innerText = text;
    };
  };

  self.mpCheckbox = function() {
    // Grab the nodeList of all of the checkboxes
    var checkboxes = document.querySelectorAll(self.selectors.checkboxItem),
      // Cache the length
      checkboxesLength = checkboxes.length;
    // If we have any
    if (checkboxesLength) {
      // Loop through them
      for (var i = 0, l = checkboxesLength; i < l; i++) {
        // Assign an on click function
        checkboxes[i].onclick = function() {
          // Toggle the class to make it selected or unselected
          toggleClass(this, self.classes.checkboxSelected);
          // Find the number of now-selected boxes
          var checked = document.querySelectorAll('.' + self.classes.checkboxSelected).length,
            // Find the total number of boxes that exist
            totalChecked = document.querySelectorAll('['+self.selectors.checkboxTotal+']')[0].getAttribute(self.selectors.checkboxTotal),
            // Work out a percentage complete based on those two numbers
            percentage = checked / parseInt(totalChecked, 10) * 100,
            // Cache the total node object so that we can use it easily later
            totalSelector = document.querySelectorAll(self.selectors.checkboxCompletion)[0];
          // Change the value of the currently completed tasks to our updated value
          document.querySelectorAll(self.selectors.checkboxCurrent)[0].innerText = checked;
          // Update the width of our progress bar
          document.querySelectorAll(self.selectors.checkboxCompletion + ' > i')[0].style.width = percentage+'%';
          // Toggle the complete class dependant on whether we've nailed all of the checkboxes or not
          if (checked >= totalChecked) {
            addClass(totalSelector, self.classes.checkboxComplete);
          }
          else {
            removeClass(totalSelector, self.classes.checkboxComplete);
          }
          return false;
        };
      };
    };
  };

  self.ready = function() {
    self.mpChangeTitle();
    self.mpCheckbox();
  };

  self.ready();

};