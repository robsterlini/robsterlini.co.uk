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
      age: 26,
      greeting: 'Phwoar blimey',
      comparison: '<em>reaaaaally</em> ancient',
      past: 'really',
      alert: 'older'
    },
    oldest: {
      age: 52,
      greeting: 'Holy dinosaurs',
      comparison: 'so damn pre-historic',
      past: 'Fred-Flitstone-style',
      alert: 'oldest'
    }
  }

  // Function to calculate the difference between two dates
  // taken from http://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html#fbid=neQipm-K39D
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

  // Function that we can call to insert the age into the post
  self.getAge = function() {
    // Cache the age selector
    var ageItem = document.querySelectorAll(self.selectors.postAge);
    // If one exists then we can do the dance:
    if (ageItem.length) {
      // Set the age as the attribute from the article
      // whilst replacing the hyphens with slashes so Firefox and Safari recognise it
      var age = ageItem[0].getAttribute(self.attrs.age).replace(/-/g, "/"),
        // Set that as a Date()
        ageDate = new Date(age),
        // Set today’s date as a Date()
        today = new Date(),
        // Find the difference between the two in weeks
        ageDiff = Date.dateDiff('w', ageDate, today);
      if (ageDiff > self.variables.oldest.age) {
        var ageAlert = self.variables.oldest,
          ageDiffNum = Math.floor(ageDiff / 52),
          ageDiffSet = 'over ' + (ageDiffNum > 1 ? ageDiffNum : 'a') + ' year' + (ageDiffNum > 1 ? 's' : '');
      }
      else if (ageDiff > self.variables.older.age) {
        var ageAlert = self.variables.older,
          ageDiffNum = Math.floor(ageDiff / 52 * 12),
          ageDiffSet = 'over ' + ageDiffNum + ' month' + (ageDiffNum > 1 ? 's' : '');
      }
      else if (ageDiff > self.variables.old.age) {
        var ageAlert = self.variables.old,
          ageDiffSet = ageDiff + ' weeks';
      }
        // Work out which object we need to grab to set the variables
        // or set it to false if it’s newer than the oldest we care about
        // ageAlert = ageDiff > self.variables.old.age ? ageDiff > self.variables.older.age ? ageDiff > self.variables.oldest.age ? self.variables.oldest : self.variables.older : self.variables.old : false;
      // If it’s proper old like start doing stuff: 
      if (ageAlert) {
        // Create the paragraph node we’re going to be inserting
        var ageNode = document.createElement('p'),
          // Grab the parent that we’re going to insert the paragraph into
          wrapperInsert = document.querySelectorAll(self.selectors.warning)[0],
          // Set the message we’re going to add using the age-based variables from the object
          ageMessage =  '<strong>' + ageAlert.greeting + '! </strong>';
          ageMessage += 'This post is ' + ageDiffSet + ' old; that’s ' + ageAlert.comparison + '. ';
          ageMessage += 'Some of this might be ' + ageAlert.past + ' out of date. You’ve been warned.';
        // Insert the message into the new paragraph node
        ageNode.innerHTML = ageMessage;
        // Give it the correct classname as decided earlier
        ageNode.className = 'alert--' + ageAlert.alert;
        // And then insert it into the DOM
        wrapperInsert.insertBefore(ageNode, wrapperInsert.firstChild);
      }
    }
  };

  self.ready = function() {	
    self.getAge();
  };

  self.ready();

};