// import React from 'react';

// // screens
// import Login from './screens/Login';
// import Signup from './screens/Signup';
// import Welcome from './screens/welcome';

// export default function App() {
//   return <Login />;

// }

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminLogin from './screens/AdminLogin';
import Login from './screens/Login';
import welcome from './screens/welcome';
import Signup from './screens/Signup';
import CustomerCommon from './screens/customerCommon';

import AdminCommon from './screens/Admin/AdminCommon';
import AdminService from './screens/Admin/AdminService';
import SelectedService from './screens/customerSelected';
import SelectedDateTime from './screens/customerDateTime';
import AdminUpcomingAppointment from './screens/Admin/AdminUpcommingAppointment';
import AdminPastAppointment from './screens/Admin/AdminPastAppointment';
import CustomerAppointment from './screens/CustomerAppointment';
import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={welcome} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="AdminLogin" component={AdminLogin} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
        <Stack.Screen options={{ headerShown: false }} name="AdminCommon" component={AdminCommon} />
        <Stack.Screen options={{ headerShown: false }} name="AdminService" component={AdminService} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AdminUpcomingAppointment"
          component={AdminUpcomingAppointment}
        />
        <Stack.Screen options={{ headerShown: false }} name="AdminPastAppointment" component={AdminPastAppointment} />
        <Stack.Screen options={{ headerShown: false }} name="SelectedService" component={SelectedService} />
        <Stack.Screen options={{ headerShown: false }} name="SelectedDateTime" component={SelectedDateTime} />
        <Stack.Screen options={{ headerShown: false }} name="CustomerCommon" component={CustomerCommon} />

        <Stack.Screen options={{ headerShown: false }} name="CustomerAppointment" component={CustomerAppointment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
