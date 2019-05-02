import { Localization } from 'expo';
import i18n from 'i18n-js';

const translations = {
  en: {
    account: 'Account',
    password: 'Password',
    signIn: 'Sign in',
    reservations: 'Reservations',
    camera: 'Camera',
    myReservations: 'MyReservations',
    new: 'New',
    all: 'All',
    location: 'Location',
    date: 'Date',
    timeSlot: 'Time Slot',
    licensePlateNumber: 'License plate number',
    materials: 'Materials',
    booked: 'Booked',
    accept: 'Accept',
    refuse: 'Refuse',
    cancel: 'Cancel',
    accepted: 'Accepted',
    refused: 'Refused',
    canceled: 'Canceled',
    error: 'Error',
    carNumber: 'car number',
    activeAlert: 'Active Alert',
    logout: 'Logout',
    newReservation: 'New Reservation',
    paramsIncomplete: 'some data is empty',
    submit: 'Submit',
    needReview: 'Need Review',
    language: 'Language',
    settings: 'Settings'
  },
  zh: {
    account: '帳號',
    password: '密碼',
    signIn: '登入',
    reservations: '預約',
    camera: '監控',
    myReservations: '我的預約',
    new: '待處理',
    all: '所有預約',
    location: '地點',
    date: '日期',
    timeSlot: '時間',
    licensePlateNumber: '車牌號碼',
    materials: '材料',
    booked: '已預約',
    accept: '同意',
    refuse: '拒絕',
    cancel: '取消',
    accepted: '已同意',
    refused: '已拒絕',
    canceled: '已取消',
    error: '發生錯誤',
    carNumber: '車輛數量',
    activeAlert: '開啟通知',
    logout: '登出',
    newReservation: '建立預約',
    paramsIncomplete: '資料填寫不完整',
    submit: '送出',
    needReview: '待處理',
    language: '語言',
    settings: '設定'
  }
};

i18n.fallbacks = true;
i18n.translations = translations;
i18n.locale = Localization.locale;

export default i18n;