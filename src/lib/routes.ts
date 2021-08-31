import {
  AtriumIcon,
  CoffeeChatIcon,
  HelpDeskIcon,
  ScheduleIcon,
  WhatsOnIcon
} from '../icons/module';

import { Routes } from './constants';
import { AppRoute, ConfigSettings, AuthToken } from './types';

export function getDefaultRoutes(
  user: AuthToken | null,
  settings: ConfigSettings,
  t: (key: string) => string
) {
  const routes: AppRoute[] = [];

  if (settings.atrium.visible) {
    routes.push({
      title: t('deconf.appLayout.atrium'),
      name: Routes.Atrium,
      enabled: settings.atrium.enabled,
      icon: AtriumIcon
    });
  }

  if (settings.whatsOn.visible) {
    routes.push({
      title: t('deconf.appLayout.whatsOn'),
      name: Routes.WhatsOn,
      enabled: settings.whatsOn.enabled,
      icon: WhatsOnIcon
    });
  }

  if (settings.schedule.visible) {
    routes.push({
      title: t('deconf.appLayout.schedule'),
      name: Routes.Schedule,
      enabled: Boolean(user) && settings.schedule.enabled,
      icon: ScheduleIcon
    });
  }

  if (settings.coffeeChat.visible) {
    routes.push({
      title: t('deconf.appLayout.coffeeChat'),
      name: Routes.CoffeeChatLobby,
      enabled: Boolean(user) && settings.coffeeChat.enabled,
      icon: CoffeeChatIcon
    });
  }

  if (settings.helpDesk.visible) {
    routes.push({
      title: t('deconf.appLayout.helpDesk'),
      name: Routes.HelpDesk,
      enabled: Boolean(user) && settings.helpDesk.enabled,
      icon: HelpDeskIcon
    });
  }

  return routes;
}
