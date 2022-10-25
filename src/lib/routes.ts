import { ConferenceConfig, AuthToken, PageFlag } from '@openlab/deconf-shared';
import VueI18n from 'vue-i18n';
import VueRouter, { NavigationGuardNext, Route } from 'vue-router';

import { Routes } from './constants';
import { AppRoute } from './types';

/** @deprecated */
export function getDefaultRoutes(
  user: AuthToken | null,
  settings: ConferenceConfig,
  t: (key: string) => string
): AppRoute[] {
  const routes: AppRoute[] = [];

  if (settings.atrium.visible) {
    routes.push({
      title: t('deconf.appLayout.atrium'),
      name: Routes.Atrium,
      enabled: settings.atrium.enabled,
      icon: undefined,
    });
  }

  if (settings.whatsOn.visible) {
    routes.push({
      title: t('deconf.appLayout.whatsOn'),
      name: Routes.WhatsOn,
      enabled: settings.whatsOn.enabled,
      icon: undefined,
    });
  }

  if (settings.schedule.visible) {
    routes.push({
      title: t('deconf.appLayout.schedule'),
      name: Routes.Schedule,
      enabled: Boolean(user) && settings.schedule.enabled,
      icon: undefined,
    });
  }

  if (settings.coffeeChat.visible) {
    routes.push({
      title: t('deconf.appLayout.coffeeChat'),
      name: Routes.CoffeeChatLobby,
      enabled: Boolean(user) && settings.coffeeChat.enabled,
      icon: undefined,
    });
  }

  if (settings.helpDesk.visible) {
    routes.push({
      title: t('deconf.appLayout.helpDesk'),
      name: Routes.HelpDesk,
      enabled: Boolean(user) && settings.helpDesk.enabled,
      icon: undefined,
    });
  }

  return routes;
}

/**
 * Guard a route against a PageFlag unless an admin is visiting
 * @deprecated
 */
export function guardRoute<T extends Record<string, PageFlag>>(
  schedule: T | undefined,
  key: keyof T,
  user: AuthToken | null,
  router: VueRouter
): void {
  if (user && user.user_roles.includes('admin')) return;
  if (!schedule) return;

  const flag = schedule[key];

  if (!flag || flag.enabled !== true || flag.visible !== true) {
    router.replace({ name: Routes.NotFound });
  }
}

/** Guard navigation to a page based on a user and `PageFlag` */
export function guardPage(
  flag: PageFlag | undefined,
  user: AuthToken | null,
  router: VueRouter
) {
  if (user && user.user_roles.includes('admin')) return;
  if (!flag) return;

  if (!flag || flag.enabled !== true || flag.visible !== true) {
    router.replace({ name: Routes.NotFound });
  }
}

/**
 * Generate a title for a given route, based on `meta.pageTitle` i18n key,
 * plus `deconf.general.appName`.
 */
export function getRouteTitle(route: Route, i18n: VueI18n): string {
  const routeWithTitle = [...route.matched]
    .reverse()
    .find((r) => r.meta.pageTitle);

  const appName = i18n.t('deconf.general.appName') as string;
  if (!routeWithTitle) return appName;

  const pageName = i18n.t(routeWithTitle.meta.pageTitle);
  return [pageName, appName].join(' | ');
}

/** Generate a normal-ish scroll-behaviour for a SPA that wants to act like a webpage */
export function getScrollBehaviour(scrollOffest: number) {
  return (
    to: Route,
    from: Route,
    savedPosition: { x: number; y: number } | void
  ) => {
    // If they clicked on a hash, scroll to that
    if (to.hash && to.name !== Routes.TokenCapture) {
      return {
        selector: to.hash,
        offset: { x: 0, y: scrollOffest },
      };
    }

    // If they've been to the page, scroll back to there
    // Only available when navigating back via the browser
    if (savedPosition) return savedPosition;

    // Otherwise, its a new page so go to the top
    return { x: 0, y: 0 };
  };
}
