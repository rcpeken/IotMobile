import { StyleSheet, View, ImageBackground } from 'react-native'
import React from 'react'
import { Card, Text, IconButton, Surface, MD3Colors } from 'react-native-paper'

export default function Main({ route }) {
  const goToLock = () => {
    if (route?.params?.setIndex) {
      route.params.setIndex(1);
    }
  };

  const goToPlant = () => {
    if (route?.params?.setIndex) {
      route.params.setIndex(2);
    }
  };

  const goToAir =()=>{
    if(route?.params?.setIndex){
      (route.params.setIndex(3))
    }
  }

  return (
    <ImageBackground
      source={require("../assets/iot_back.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.21)' }}>
        <Surface style={styles.header} elevation={0}>
          <Text variant="headlineMedium" style={styles.title}>Akıllı Ev</Text>
          <Text variant="titleMedium" style={styles.subtitle}>Hoş Geldiniz</Text>
        </Surface>

        <View style={styles.cardContainer}>
          <Card style={styles.card} onPress={goToLock}>
            <Card.Content style={styles.cardContent}>
              <IconButton
                icon="door"
                size={40}
                iconColor={MD3Colors.primary50}
              />
              <Text variant="titleMedium">Kapı Kontrolü</Text>
              <Text variant="bodySmall">Kapı durumunu kontrol edin</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card} onPress={goToPlant}>
            <Card.Content style={styles.cardContent}>
              <IconButton
                icon="flower"
                size={40}
                iconColor={MD3Colors.tertiary50}
              />
              <Text variant="titleMedium">Bitki Bakımı</Text>
              <Text variant="bodySmall">Bitkinizin durumunu kontrol edin</Text>
            </Card.Content>
          </Card>
          <Card style={styles.card} onPress={goToAir}>
            <Card.Content style={styles.cardContent}>
              <IconButton
                icon="air-filter"
                size={40}
                iconColor={MD3Colors.secondary50}
              />
              <Text variant="titleMedium">Hava Kalite Kontrol</Text>
              <Text variant="bodySmall">Odadaki havanın kalitesini kontrol edin</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    padding: 24,
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#efefef',
    marginTop: 25,
  },
  subtitle: {
    color: '#efefef',
    marginTop: 4,
  },
  cardContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    elevation: 2,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})