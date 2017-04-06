// Compress via uglify:
// uglifyjs load-disqus.js -c -m > load-disqus.min.js
(function(w, d) {
  var disqus_config = function () {
    this.page.title = '{{ page.title }}';
    this.page.identifier = '{{ page.id }}';
    this.page.url = '{{ page.url | absolute_url }}';
  };

  w._disqusFirst = typeof w._disqusFirst != 'undefined' ? w._disqusFirst : true;
  w._disqusLoading = typeof w._disqusLoading != 'undefined' ? w._disqusLoading : false;
  w._disqusThis = false;
  w._disqusThreadOffsetTop = d.getElementById('disqus_thread').offsetTop;

  function loadDQ(e) {
    var scrollTop = w.pageYOffset || d.body.scrollTop;
    if ( w.DISQUS &&
        !w._disqusThis &&
        !w._disqusFirst &&
        scrollTop + w.innerHeight >= w._disqusThreadOffsetTop) {

      w._disqusThis = true;
      w.DISQUS.reset({
        reload: true,
        config: disqus_config
      });
    }
  };

  if (!w._disqusLoading) {
    w._disqusLoading = true;

    loadJSDeferred('//{{ site.disqus_shortname }}.disqus.com/embed.js');

    // add event listener
    if (w.addEventListener) w.addEventListener('scroll', loadDQ, { passive: true });
    else if (w.attachEvent) w.attachEvent('onscroll', loadDQ);
    else w.onscroll = loadDQ;
  } else {
    w._disqusFirst = false;
  }
}(window, document));
