// CSS imports
import '../styles/styles.css';
import 'leaflet/dist/leaflet.css';

import App from './pages/app';
import { registerServiceWorker } from './utils';
import Camera from './utils/camera';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    drawerNavigation: document.querySelector('#navigation-drawer'),
    skipLinkButton: document.getElementById('skip-link'),
  });
  await app.renderPage();

  await registerServiceWorker();

  // for demonstration purpose-only
  console.log('Berhasil mendaftarkan service worker.');

  window.addEventListener('hashchange', async () => {
    await app.renderPage();

    // Stop all active media
    Camera.stopAllStreams();
  });
});
