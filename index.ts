import { registerRootComponent } from 'expo';

import App from './App';

const root = globalThis as typeof globalThis & { __MEDIGRYD_BOOTED__?: boolean };

// Cursor Preview can inject /index.ts.bundle on top of the HTML script tag.
// Registering twice remounts the tree and looks like a reload loop.
if (!root.__MEDIGRYD_BOOTED__) {
  root.__MEDIGRYD_BOOTED__ = true;
  registerRootComponent(App);
}
