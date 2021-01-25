export interface ConfigFlag {
  enabled: boolean;
  visible: boolean;
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
}

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
  textColor: string; //
}
