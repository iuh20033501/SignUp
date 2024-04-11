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
import DetailProfile from './screens/DetailProfile';

const App = () => {
  const stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <stack.Navigator initialRouteName='Home' options={{headerShown:false}}>
      {/* <stack.Screen name = 'RegisterForm' component={RegisterForm}  options={{ headerShown: true }}/>
      <stack.Screen name = 'Authentication' component={Authentication}  options={{ headerShown: true }}/>
      <stack.Screen name = 'Register' component={Register}  options={{ headerShown: true }}/> */}
      <stack.Screen name = 'ProfileScreen' component={ProfileScreen}  options={{ headerShown: true }}/>
      <stack.Screen name = 'DetailProfile' component={DetailProfile}  options={{ headerShown: true }}/>


    </stack.Navigator>
   </NavigationContainer>
  // <Authentication></Authentication>
  // <SettingScreen></SettingScreen>
  // <FindScren></FindScren>
  // <RegisterForm></RegisterForm>
  // <ProfileScreen></ProfileScreen>
  // <DetailProfile></DetailProfile>
  // <Register></Register>
  
  );
};

export default App;
