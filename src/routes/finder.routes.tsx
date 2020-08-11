import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';

const Stack = createStackNavigator();

import Finder from '../pages/Finder';

const FinderRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colors.secondary },
      }}
    >
      <Stack.Screen
        name="Finder"
        component={Finder}
        options={{ headerTitle: 'Descubra' }}
      />
    </Stack.Navigator>
  );
};

export default FinderRoutes;
