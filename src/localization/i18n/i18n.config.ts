import i18next from 'i18next';
import {en} from '../translation';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncManager} from '../../constants/utils/AsyncManager';

const resources = {
  en: {translation: en},
};

export const initI18n = async () => {
  const asyncLang = await AsyncStorage.getItem(AsyncManager.Keys.appLanguage);
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
  AsyncManager.setData(AsyncManager.Keys.appLanguage, langKey);
};

export default i18next;
