import { ConferenceConfig, AuthToken, PageFlag } from '@openlab/deconf-shared';
import VueRouter from 'vue-router';

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

/** Guard a route against a PageFlag unless an admin is visiting */
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
