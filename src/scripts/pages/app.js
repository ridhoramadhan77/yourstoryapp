import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import {
  generateAuthenticatedNavigationListTemplate,
  generateMainNavigationListTemplate,
  generateUnauthenticatedNavigationListTemplate,
  generateSubscribeButtonTemplate,
  generateUnsubscribeButtonTemplate,
} from '../templates'
import { isServiceWorkerAvailable, setupSkipToContent, transitionHelper } from '../utils';
import { getAccessToken, getLogout } from '../utils/auth';
import { isCurrentPushSubscriptionAvailable, subscribe, unsubscribe } from '../utils/notification-helper';

class App {
  #content = null;
  #drawerButton = null;
  #drawerNavigation = null;
  // #navigationDrawer = null;
  #skipLinkButton = null;

  constructor({ drawerNavigation, drawerButton, content, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    // this.#navigationDrawer = navigationDrawer;
    this.#drawerNavigation = drawerNavigation;
    this.#skipLinkButton = skipLinkButton;

    // this._setupDrawer();
    this.#init();
  }

  // _setupDrawer() {
  //   this.#drawerButton.addEventListener('click', () => {
  //     this.#navigationDrawer.classList.toggle('open');
  //   });

  //   document.body.addEventListener('click', (event) => {
  //     if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
  //       this.#navigationDrawer.classList.remove('open');
  //     }

  //     this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
  //       if (link.contains(event.target)) {
  //         this.#navigationDrawer.classList.remove('open');
  //       }
  //     })
  //   });
  // }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#drawerNavigation.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      const isTargetInsideDrawer = this.#drawerNavigation.contains(event.target);
      const isTargetInsideButton = this.#drawerButton.contains(event.target);

      if (!(isTargetInsideDrawer || isTargetInsideButton)) {
        this.#drawerNavigation.classList.remove('open');
      }

      this.#drawerNavigation.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#drawerNavigation.classList.remove('open');
        }
      });
    });
  }

  #setupNavigationList() {
    const isLogin = !!getAccessToken();
    const navListMain = this.#drawerNavigation.children.namedItem('navlist-main');
    const navList = this.#drawerNavigation.children.namedItem('navlist');

    // User not log in
    if (!isLogin) {
      navListMain.innerHTML = '';
      navList.innerHTML = generateUnauthenticatedNavigationListTemplate();
      return;
    }

    navListMain.innerHTML = generateMainNavigationListTemplate();
    navList.innerHTML = generateAuthenticatedNavigationListTemplate();

    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();

      if (confirm('Apakah Anda yakin ingin keluar?')) {
        getLogout();

        // Redirect
        location.hash = '/login';
      }
    });
  }

  async #setupPushNotification() {
    const pushNotificationTools = document.getElementById('push-notification-tools');

    const isSubscribed = await isCurrentPushSubscriptionAvailable();
    if (isSubscribed) {
      pushNotificationTools.innerHTML = generateUnsubscribeButtonTemplate();
      document.getElementById('unsubscribe-button').addEventListener('click', () => {
        unsubscribe().finally(() => {
          this.#setupPushNotification();
        });
      });
      return;
    }

    pushNotificationTools.innerHTML = generateSubscribeButtonTemplate();
    document.getElementById('subscribe-button').addEventListener('click', () => {
      // TODO: subscribe to push manager
      subscribe().finally(() => {
        this.#setupPushNotification();
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    const page = route();

    // this.#content.innerHTML = await page.render();
    // await page.afterRender();

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        page.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: 'instant' });
      this.#setupNavigationList();

      if (isServiceWorkerAvailable()) {
        this.#setupPushNotification();
      }
    });
  }
}

export default App;
