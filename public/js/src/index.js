import { loadCSS } from 'fg-loadcss/src/loadCSS';

import './katex';
import './drawer';

global.loadCSS = loadCSS;
require('./cssrelpreload');
