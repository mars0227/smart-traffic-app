import React from 'react';
import Login from '../pages/Login';
import Main from '../pages/Main';
import MyReservations from '../pages/MyReservations';
import ManageReservations from '../pages/ManageReservations';
import Reservation from '../pages/Reservation';
import CreateReservation from '../pages/CreateReservation';
import SelectLocation from '../pages/SelectLocation';
import DatePicker from '../pages/DatePicker';
import TimeSlotPicker from '../pages/TimeSlotPicker';
import LicensePlateNumberInput from '../pages/LicensePlateNumberInput';
import MaterialInput from '../pages/MaterialInput';
import CameraView from '../pages/CameraView';
import MonitorView from '../pages/MonitorView';
import {
  createStackNavigator,
  createAppContainer,
} from "react-navigation";
import IOSFont from '../pages/ISOFont';
import AndroidFont from '../pages/AndroidFont';
import WeekCalendar from '../pages/WeekCalendar';
import PartialReservations from '../pages/PartialReservations';
import NewReservations from '../pages/NewReservations';
import Settings from '../pages/Settings';
import i18n from '../constants/i18n';

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({ header: null })
    },
    Main: {
      screen: Main,
    },
    MyReservations: {
      screen: MyReservations,
    },
    ManageReservations: {
      screen: ManageReservations,
      navigationOptions: {
        title: i18n.t('reservations')
      }
    },
    CreateReservation: {
      screen: CreateReservation
    },
    SelectLocation: {
      screen: SelectLocation
    },
    DatePicker: {
      screen: DatePicker
    },
    TimeSlotPicker: {
      screen: TimeSlotPicker
    },
    LicensePlateNumberInput: {
      screen: LicensePlateNumberInput
    },
    MaterialInput: {
      screen: MaterialInput
    },
    Reservation: {
      screen: Reservation
    },
    CameraView: {
      screen: CameraView,
      navigationOptions: () => ({ header: null })
    },
    MonitorView: {
      screen: MonitorView
    },
    IOSFont: {
      screen: IOSFont
    },
    AndroidFont: {
      screen: AndroidFont
    },
    WeekCalendar: {
      screen: WeekCalendar
    },
    PartialReservations: {
      screen: PartialReservations
    },
    NewReservations: {
      screen: NewReservations
    },
    Settings: {
      screen: Settings
    }
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'royalblue'
      },
      headerTintColor: 'white'
    }
  });

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;