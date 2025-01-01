import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNavigation, Text } from 'react-native-paper';
import Lock from '../Home/Lock';
import Plant from '../Home/Plant';
import Main from '../Home/Main';
import Air from '../Home/Air';


export default function BottomNavi() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Anasayfa', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'lock', title: 'Kilit', focusedIcon: 'lock', unfocusedIcon: 'lock-outline' },
    { key: 'plant', title: 'Bitki', focusedIcon: 'leaf', unfocusedIcon: 'leaf-maple' },
    { key: 'air', title: 'Yanıcı Gaz', focusedIcon: 'air-filter', unfocusedIcon: 'air-purifier' }
  ]);

  const HomeRoute = () => <Main route={{ params: { setIndex } }} />;
  const LockRoute = () => <Lock />;
  const PlantRoute = () => <Plant />;
  const AirRoute = () => <Air/>

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    lock: LockRoute,
    plant: PlantRoute,
    air: Air,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.botNavi}
      />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  botNavi: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
})