// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
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

if (!window._noKaTeX) {
  let loaded;

  const promisify = (load, href) => new Promise(resolve => load(href).addEventListener('load', resolve));
  const loadJS = (href) => promisify(window.loadJS, href);
  const loadCSS = (href) => promisify(window.loadCSS, href);

  const upgradeMathBlocks = () => {
    const mathBlocks = document.querySelectorAll('.katex');
    if (mathBlocks.length && !loaded) {
      loaded = Promise.all([
        loadJS(document.getElementById('_hrefKatexJS').href),
        loadCSS(document.getElementById('_hrefKatexCSS').href),
        loadJS(document.getElementById('_hrefKatexCopyJS').href),
        loadCSS(document.getElementById('_hrefKatexCopyCSS').href),
      ]);
    }
  };

  upgradeMathBlocks();
  document.querySelector('hy-push-state').addEventListener('load', upgradeMathBlocks);
}
