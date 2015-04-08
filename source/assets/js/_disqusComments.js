/**
 * Disqus comments partial
 */

g.disqusComments = function() {
  var self = g.disqusComments;

  self.selectors = {
  	commentsWrapper: "disqus_thread"
  }

  if (document.getElementById(self.selectors.commentsWrapper)) {
	  var disqus_shortname = 'robsterlini';
	  (function() {
	    var dsq = document.createElement('script');
	    dsq.type = 'text/javascript';
	    dsq.async = true;
	    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
	    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	  })();
	}

};