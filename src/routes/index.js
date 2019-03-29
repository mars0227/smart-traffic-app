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
import MyReservationInConstruction from '../pages/MyReservationInConstruction';
import CameraView from '../pages/CameraView';
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
} from "react-navigation";
import { connect } from 'react-redux';
import { logoutAction } from '../actions';

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
        title: 'Reservations'
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
  
const CustomContentComponent = props => (
  <DrawerItems {...{ ...props, onItemPress: () => props.handleLogout() }} />
);

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logoutAction())
});

const CustomContentComponentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomContentComponent);

const DrawerNavigator = createDrawerNavigator({
    Logout: {
      screen: StackNavigator,
      navigationOptions: () => ({
        drawerLockMode: 'locked-closed'
      })
    }
  }, {
    drawerPosition: 'right',
    drawerType: 'slide',
    contentComponent: CustomContentComponentContainer
  }
);

const AppContainer = createAppContainer(DrawerNavigator);

export default AppContainer;