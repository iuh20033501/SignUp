import React from 'react';
import { SafeAreaView } from 'react-native';
import RegisterForm from '../SignUp/screens/RegisterForm';
import Authentication from './screens/Authentication';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from './screens/SettingScreen';
import FindScren from './screens/FindScreen';
import ProfileScreen from './screens/ProfileScreen';
import Register from './screens/Register';

const App = () => {
  const stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <stack.Navigator initialRouteName='Home' options={{headerShown:false}}>
      <stack.Screen name = 'RegisterForm' component={RegisterForm}  options={{ headerShown: false }}/>
      <stack.Screen name = 'Authentication' component={Authentication}  options={{ headerShown: false }}/>
      <stack.Screen name = 'Register' component={Register}  options={{ headerShown: false }}/>
    </stack.Navigator>
   </NavigationContainer>
  // <Authentication></Authentication>
  // <SettingScreen></SettingScreen>
  // <FindScren></FindScren>
  // <RegisterForm></RegisterForm>
  // <ProfileScreen></ProfileScreen>
  // <Register></Register>
  
  );
};

export default App;
