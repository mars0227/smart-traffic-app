import React from 'react';
import NewReservations from './NewReservations';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import WeekCalendar from './WeekCalendar';
import i18n from '../constants/i18n';

const TabNavigator = createMaterialTopTabNavigator(
  {
    New: NewReservations,
    All: {
      screen: WeekCalendar,
      navigationOptions: {
        title: i18n.t('all')
      }
    },
  },
  {
    initialRouteName: 'New',
    tabBarOptions: {
      style: { backgroundColor: 'royalblue' },
      indicatorStyle: { backgroundColor: 'white' }
    }
  }
);

export default createAppContainer(TabNavigator);