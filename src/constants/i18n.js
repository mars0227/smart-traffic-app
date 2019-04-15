import { Localization } from 'expo';

const translations = {
  en: {
    account: 'Account',
    password: 'Password'
  },
  zh: {
    account: '帳號',
    password: '密碼',
  }
};

export default translations[Localization.locale];