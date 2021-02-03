//
// Util for generating app settings
//

export function createSettings() {
  return {
    atrium: { enabled: true, visible: true },
    whatsOn: { enabled: true, visible: true },
    schedule: { enabled: true, visible: true },
    coffeeChat: { enabled: true, visible: true },
    helpDesk: { enabled: true, visible: true },

    startDate: new Date(),
    endDate: new Date(),
    isStatic: false,

    availableLanguages: [
      {
        locale: 'en',
        title: 'English'
      }
    ]
  };
}
