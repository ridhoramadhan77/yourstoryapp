import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import StoryDetailPage from '../pages/story-detail/story-detail-page';
import BookmarkPage from '../pages/bookmark/bookmark-page';

import NewPage from '../pages/new/new-page';

import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register.page';

import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';

const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),


  '/': () => checkAuthenticatedRoute(new HomePage()),
  '/new': () => checkAuthenticatedRoute(new NewPage()),
  '/stories/:id': () => checkAuthenticatedRoute(new StoryDetailPage()),
  '/bookmark': () => checkAuthenticatedRoute(new BookmarkPage()),
  '/about': new AboutPage(),
};

export default routes;
