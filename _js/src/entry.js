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

import "@babel/polyfill";
import "intersection-observer";
import { default as ResizeObserver } from "resize-observer-polyfill";
import "web-animations-js";
import { default as smoothscroll } from "smoothscroll-polyfill";
import "../lib/webcomponents";
import "../lib/modernizr-custom";
import "../lib/request-idle-callback";
import "../lib/version";

import "./images";
import "./drawer";
import "./push-state";
import "./katex";

window.ResizeObserver = window.ResizeObserver || ResizeObserver;
smoothscroll.polyfill();
