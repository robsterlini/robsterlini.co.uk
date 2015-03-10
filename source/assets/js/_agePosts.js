/**
 * Age posts partial
 *
 * Gets the age of a post, and applies an alert where necessary
 */

g.agePosts = function() {
	var self = g.agePosts;

	self.selectors = {
		postAge: '[data-age]',
    warning: '[data-js="append-age-warning"]'
	}

  self.attrs = {
    age: 'data-age'
  }

  self.variables = {
    old: {
      age: 16,
      greeting: 'Woah',
      comparison: 'pretty old',
      past: 'a bit',
      alert: 'old'
    },
    older: {
      age: 33,
      greeting: 'Phwoar blimey',
      comparison: '<em>reaaaaally</em> ancient',
      past: 'really',
      alert: 'older'
    },
    oldest: {
      age: 50,
      greeting: 'Holy dinosaurs',
      comparison: 'so damn pre-historic',
      past: 'Fred-Flitstone-style',
      alert: 'oldest'
    }
  }

  Date.dateDiff = function(datepart, fromdate, todate) {  
    datepart = datepart.toLowerCase();  
    var diff = todate - fromdate; 
    var divideBy = { w:604800000, 
                   d:86400000, 
                   h:3600000, 
                   n:60000, 
                   s:1000 };  
    return Math.floor( diff/divideBy[datepart]);
  }

  self.getAge = function() {
    var ageItem = $(self.selectors.postAge);
    if (ageItem.length) {
      var age = ageItem.attr(self.attrs.age).replace(/-/g, "/"),
        ageDate = new Date(age),
        today = new Date(),
        ageDiff = Date.dateDiff('w', ageDate, today),
        ageAlert = ageDiff > self.variables.old.age ? ageDiff > self.variables.older.age ? ageDiff > self.variables.oldest.age ? self.variables.oldest : self.variables.older : self.variables.old : false;
      if (ageAlert) {
        var ageMessage = '<p class="alert--' + ageAlert.alert + '"><strong>' + ageAlert.greeting + '! </strong>This post is ' + ageDiff + ' weeks old; that’s ' + ageAlert.comparison + '. Some of this might be ' + ageAlert.past + ' out of date. You’ve been warned.</p>';
        $(self.selectors.warning).prepend(ageMessage);
      }
    }
  }

	$(document).ready(function() {
    self.getAge();
  });

};