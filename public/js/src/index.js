import { loadCSS } from 'fg-loadcss/src/loadCSS';

import './katex';
import './drawer';
import './smooth-state';

global.loadCSS = loadCSS;
require('../lib/cssrelpreload');
