/**
 * 
 */
import Mustache from 'mustache';

import { USER_EXTENSION } from './extension-user-prompts.js';
import { SYSTEM_EXTENSION } from './extension-system-messages.js';
import { README } from './readme-content.js';
'use strict';

// The escape function is changed to prevent Mustache from escaping symbols like ' into &quot
Mustache.escape = (value) => { return value; }

export {};