export interface ConfigFlag {
  enabled: boolean;
  visible: boolean;
}

export interface User {
  kind: 'auth';
  sub: number;
  user_roles: string[];
  user_lang: string;
}

export interface AppSettings {
  atrium: ConfigFlag;
  whatsOn: ConfigFlag;
  schedule: ConfigFlag;
  coffeeChat: ConfigFlag;
  helpDesk: ConfigFlag;

  startDate: Date;
  endDate: Date;
  isStatic: boolean;

  availableLanguages: Array<{
    locale: string;
    title: string;
  }>;
}

// IDEA: can we abstract the theme to this object and pass it around?
export interface AppTheme {
  // #ff6f61
  primaryColor: string;

  // #ffffff
  primaryColorAlt: string;

  // #6c63ff
  secondaryColor: string;
  // #ffffff

  secondaryColorAlt: string;

  // #363636
  textColor: string;
}
