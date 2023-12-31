import {Text, View, StatusBar } from 'react-native';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <View style={{ flex: 1, backgroundColor: '#202024', alignItems: 'center', justifyContent: 'center'}}>
        <StatusBar 
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
        />

        {fontsLoaded ? <Text style={{color: '#fff'}}>hello</Text> : <View/> }
        
      </View>
  );
}
