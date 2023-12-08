import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { AuthContext } from '@contexts/AuthContext'

import { Loading } from '@components/Loading'

import { Routes } from '@routes/index';

import { THEME } from './src/theme';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
        <StatusBar 
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
        />
      <AuthContext.Provider value={{
        
      }}>
        {fontsLoaded ? <Routes/> : <Loading/> }
        </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
