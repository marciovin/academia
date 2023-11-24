import { createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';

import { SignIn } from '@screens/signIn';
import { SignUp } from '@screens/signUp';
import { Home } from '@screens/Home'

type AuthRoutes = {
signIn: undefined;
signUp: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (  
    <Navigator screenOptions={{ headerShown: false}}>
      <Screen 
      name="signIn" 
      component={SignIn} 
      />


      <Screen 
      name="signUp" 
      component={SignUp} 
      />

      <Screen 
      name="home" 
      component={Home} 
      />

    </Navigator>
  );
}