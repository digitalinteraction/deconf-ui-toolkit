import { TranslateResult } from 'vue-i18n';

/** A key-value field to display on ProfileView */
export interface ProfileField {
  label: TranslateResult;
  value: unknown;
}
