import React from 'react';
import Login from './src/pages//Login';
import Main from './src/pages//Main';
import MyReservations from './src/pages/MyReservations';
import ManageReservations from './src/pages/ManageReservations';
import Reservation from './src/pages/Reservation';
import CreateReservation from './src/pages/CreateReservation';
import SelectLocation from './src/pages/SelectLocation';
import DatePicker from './src/pages/DatePicker';
import TimeSlotPicker from './src/pages/TimeSlotPicker';
import LicensePlateNumberInput from './src/pages/LicensePlateNumberInput';
import MaterialInput from './src/pages/MaterialInput';
import MyReservationInConstruction from './src/pages/MyReservationInConstruction';
import CameraView from './src/pages/CameraView';

import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator(
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
    MyReservationInConstruction: {
      screen: MyReservationInConstruction
    },
    Reservation: {
      screen: Reservation
    },
    CameraView: {
      screen: CameraView,
      navigationOptions: () => ({ header: null })
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

const AppContainer = createAppContainer(AppNavigator);