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

  $(document).ready(function() {
    self.mpChangeTitle();
    self.mpCheckbox();
  });

  self.mpChangeTitle = function() {
    var header = $(self.selectors.indexHeader);
    if (header.length) {
      var text = self.titles[Math.floor(Math.random()*self.titles.length)];
      $(self.selectors.indexHeader).text(text);
    }
  }

  self.mpCheckbox = function() {
    $(self.selectors.checkboxItem).on('click', function(e) {
      e.preventDefault();
      $(this).toggleClass(self.classes.checkboxSelected);
      var currentChecked = $('.'+self.classes.checkboxSelected).length,
        totalChecked = $('['+self.selectors.checkboxTotal+']').attr(self.selectors.checkboxTotal);
      $(self.selectors.checkboxCurrent).text(currentChecked);
      $(self.selectors.checkboxCompletion + ' > i').css('width', (currentChecked / totalChecked * 100)+'%');
      $(self.selectors.checkboxCompletion).toggleClass(self.classes.checkboxComplete, currentChecked == totalChecked ? true : false);
    });
  }

};