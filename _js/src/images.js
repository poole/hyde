// # src / images.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
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

import "core-js/fn/array/for-each";

import { HyImageElement, WEBCOMPONENT_FEATURE_TESTS } from "hy-img/src/webcomponent";

import { hasFeatures } from "./common";

if (hasFeatures(WEBCOMPONENT_FEATURE_TESTS)) {
  window.customElements.define("hy-img", HyImageElement);
} else {
  // If the necessary features aren't available, use the fact that we have `noscript` fallbacks
  // that are immediate children of the component, and add the fallback to the DOM
  // using minimal DOM and JavaScript APIs.
  Array.prototype.forEach.call(
    document.getElementsByTagName("hy-img"),
    el => (el.innerHTML = el.children[0].innerText)
  );
}
