g._ready = function() {
  domReady(function(event) {
    g.loadHero.ready();
    g.strikethrough.ready();
  });
}