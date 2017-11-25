// # src / cookies-banner.js
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

if (!navigator.CookiesOK && !(localStorage && localStorage.getItem('cookies-ok'))) {
  const template = document.getElementById('_cookies-banner-template');
  if (template) {
    document.getElementsByTagName('hy-push-state')[0]
      .appendChild(document.importNode(template.content, true));

    document.getElementById('_cookies-ok').addEventListener('click', (e) => {
      e.preventDefault();
      if (localStorage) localStorage.setItem('cookies-ok', true);
      const cookiesBanner = document.getElementById('_cookies-banner');
      cookiesBanner.parentNode.removeChild(cookiesBanner);
    }, { once: true });
  }
}
