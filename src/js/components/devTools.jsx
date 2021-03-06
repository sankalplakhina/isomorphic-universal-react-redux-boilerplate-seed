/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

module.exports = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-H" changePositionKey="ctrl-Q">
    <LogMonitor />
  </DockMonitor>
);
