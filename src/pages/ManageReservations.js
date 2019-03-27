import React from 'react';
import AllReservations from './AllReservations';
import NewReservations from './NewReservations';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createMaterialTopTabNavigator(
  {
    New: NewReservations,
    All: AllReservations,
  },
  {
    initialRouteName: 'New',
    tabBarOptions: {
      tabStyle: { backgroundColor: 'royalblue' }
    }
  }
);

export default createAppContainer(TabNavigator);