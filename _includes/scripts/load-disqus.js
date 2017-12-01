// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

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

    loadJSDeferred('//{{ include.disqus }}.disqus.com/embed.js');

    // add event listener
    if (w.addEventListener) w.addEventListener('scroll', loadDQ, { passive: true });
    else w.onscroll = loadDQ;
  } else {
    w._disqusFirst = false;
  }
}(window, document));
