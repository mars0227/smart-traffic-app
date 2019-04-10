import React from 'react';
import NewReservations from './NewReservations';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import WeekCalendar from './WeekCalendar';

const TabNavigator = createMaterialTopTabNavigator(
  {
    New: NewReservations,
    All: WeekCalendar,
  },
  {
    initialRouteName: 'New',
    tabBarOptions: {
      tabStyle: { backgroundColor: 'royalblue' }
    }
  }
);

export default createAppContainer(TabNavigator);