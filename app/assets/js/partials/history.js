/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.history = function() {
  var self = g.history;

// AJAX LOAD
if (typeof(window.history.pushState) == 'function') {
  $('html').addClass('pushStateOk');
  $('body').prepend('<div id="ajax-loading"><span></span></div>');
}
$(document).on('click', '.pushStateOk2 [data-history]', function(e) {
  e.preventDefault();
  var href = $(this).attr('href');

  pushStateHeader = $('#content h1:first').text();
  $('html').addClass('pushStateHidden');

  // $('#ajax-loading').removeClass('al-5 al-85 al-100').addClass('al-5 al-showing');

  var pushStateHref = href.replace('/home','/');
  history.pushState({}, '', pushStateHref);

  // $('html,body').animate({scrollTop: 0}, 300);
  $('html, body').scrollTop(0);

  $('#content').load(href + ' #content', function(response, status, xhr) {
    if (status == "error") {
      window.location.href = '/error';
    }
    else {
      $('#content > #content').unwrap();
      var hrefSlug = $('#content').attr('data-page');
      $('body').attr('id',hrefSlug);
      $('nav ul li a[href*="' + hrefSlug + '"]').addClass('active');
      document.title = document.title.replace(pushStateHeader,$('#content h1:first').text());
      $('#ajax-loading').addClass('al-85');
    }
    $('html').removeClass('pushStateHidden');

    ga('send', 'pageview', pushStateHref);
  });
});

};