// Create the global g object which will store all our code.
var g = g || {};

// Create an array of the partials we're including in the g object
// 		Ensure that these are added on separate lines so as to allow for
// 		easier version controlling when multiple users are collaborating
// 		on the JS simultaneously.
g.partials = [
  // DOM changes
  'onScreenSetup',      // Converted
  'browserSniff',       // Converted

  // Generic JS
  'agePosts',           // Converted
  'anchorScroll',       // Converted
  'codeHighlight',      // Converted
  'disqusComments',     // Converted
  'loadHero',           // Converted
  'share',              // Converted
  'strikethrough',      // Converted

  // Page specific
  'cv',                 // Converted
  'triathlon',          // Converted
  'strava',

  // Case studies
  'hotspurRelated',     // Converted
  
  // Subpages
  'middleplate'         // Converted
];

// This _init function is the function which kicks everything off when
// the document is ready.
//
// It loops through all the items in the array above, and runs that
// particular function.
//
// If we had 3 items in that array, say 'classes', 'sizing' and 'slider'
// then this function would run g.classes(), g.sizing() and g.slider();
g._init = function() {
  var self = this;
  for (var i = 0; i < this.partials.length; i++) {
    var partial = g[this.partials[i]];
    partial();
  }
};