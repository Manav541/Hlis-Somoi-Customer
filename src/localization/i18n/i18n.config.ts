import i18next from 'i18next';
import {en} from '../translation';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import {MmkvManager, storage} from '../../constants/utils/MmkvManager';

const resources = {
  en: {translation: en},
};

export const initI18n = async () => {
  const asyncLang = storage.getString(MmkvManager.Keys.appLanguage);
  const deviceLang = RNLocalize.getLocales()[0].languageCode;
  const fallbackLang = asyncLang || deviceLang || 'en';

  await i18next.use(initReactI18next).init({
    debug: true,
    lng: fallbackLang,
    fallbackLng: 'en',
    resources,
  });
};

if (!i18next.isInitialized) {
  initI18n();
}

export const getTranslation = (key: string) => {
  const translation = i18next.t(key);
  return translation !== key ? translation : null;
};

export const changeAppLanguage = async (langKey: string) => {
  await i18next.changeLanguage(langKey);
  MmkvManager.setData(MmkvManager.Keys.appLanguage, langKey);
};

export default i18next;
