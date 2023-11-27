import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';

import HomeSvg from '@assets/home.svg'
import ProfileSvg from '@assets/profile.svg'
import HistorySvg from '@assets/history.svg'


import { Home } from '@screens/home'
import { Profile } from '@screens/profile'
import { History } from '@screens/history'
import { Execise } from '@screens/execise'

type AppRoutes = {
  home: undefined,
  history: undefined,
  execise: undefined,
  profile: undefined,
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const {Navigator, Screen} = createBottomTabNavigator<AppRoutes>();


export function AppRoutes(){
  const { sizes } = useTheme()

  const iconSizes = sizes[6]

  return (
    <Navigator
     screenOptions={{
       headerShown: false, 
       tabBarShowLabel: false,
       }}>

      <Screen 
      name="home" 
      component={Home} 
      options={{
        tabBarIcon: ({color}) => (
          <HomeSvg fill={color} width={iconSizes} height={iconSizes}/>
        )
      }}
      />

      <Screen 
      name="history"  
      component={History} 
      options={{
        tabBarIcon: ({color}) => (
          <HistorySvg fill={color} width={iconSizes} height={iconSizes}/>
        )
      }}
      />

      <Screen 
      name="execise"  
      component={Execise} 
      />

      <Screen 
      name="profile" 
      component={Profile} 
      options={{
        tabBarIcon: ({color}) => (
          <ProfileSvg fill={color} width={iconSizes} height={iconSizes}/>
        )
      }}
      />

    </Navigator>
  )
}