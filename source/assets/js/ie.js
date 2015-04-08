$(document).ready(function() {
    $("[data-js='lazy-load-image']").each(function() {
        $(this).attr('src',$(this).attr("data-src"));
    });
});