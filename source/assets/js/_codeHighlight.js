/**
 * Code Highlighting partial
 *
 * Adds classes and styling to all <pre> and <code> blocks
 */

g.codeHighlight = function() {
  var self = g.codeHighlight;

  self.ready = function() {
    hljs.initHighlightingOnLoad();
  };

  self.ready();

};