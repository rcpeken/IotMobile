import { StyleSheet, View, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'
// import mqtt from 'mqtt/dist/mqtt'
import { Card, Text, IconButton, ProgressBar, Button, MD3Colors } from 'react-native-paper'

export default function Plant() {
  const [plantData, setPlantData] = useState({
    temperature: 24,
    humidity: 65,
    soilMoisture: 45,
    lightLevel: 80,
  });
  const [isWatering, setIsWatering] = useState(false);
  // const clientRef = useRef(null);

  /* useEffect(() => {
    const client = mqtt.connect('ws://<raspberry-pi-ip>:1883')
    clientRef.current = client;

    client.on('connect', () => {
      console.log('MQTT bağlantısı başarılı')
      client.subscribe('plant/temperature', (err) => {
        if (err) console.log('Sıcaklık verisine abone olunamadı.', err)
      })
      client.subscribe('plant/humidity', (err) => {
        if (err) console.log('Nem verisine abone olunamadı.', err)
      })
      client.subscribe('plant/soil', (err) => {
        if (err) console.log('Toprak nemi verisine abone olunamadı.', err)
      })
      client.subscribe('plant/light', (err) => {
        if (err) console.log('Işık seviyesi verisine abone olunamadı.', err)
      })
    })

    client.on('message', (topic, message) => {
      const value = parseFloat(message.toString());
      switch (topic) {
        case 'plant/temperature':
          setPlantData(prev => ({ ...prev, temperature: value }));
          break;
        case 'plant/humidity':
          setPlantData(prev => ({ ...prev, humidity: value }));
          break;
        case 'plant/soil':
          setPlantData(prev => ({ ...prev, soilMoisture: value }));
          break;
        case 'plant/light':
          setPlantData(prev => ({ ...prev, lightLevel: value }));
          break;
      }
    })

    client.on('error', (err) => console.error('MQTT Hatası', err))

    return () => {
      if (client) client.end()
    }
  }, []) */

  const handleWatering = () => {
    setIsWatering(true);
    Alert.alert('Başarılı', 'Sulama başlatıldı')
    setTimeout(() => {
      setIsWatering(false);
    }, 5000);
    
    /* Gerçek MQTT implementasyonu
    clientRef.current.publish('plant/water', 'start', (err) => {
      if (err) {
        console.error('Sulama başlatılamadı:', err)
        Alert.alert('Hata', 'Sulama sistemi başlatılamadı')
      } else {
        Alert.alert('Başarılı', 'Sulama başlatıldı')
        setTimeout(() => {
          setIsWatering(false);
          clientRef.current.publish('plant/water', 'stop')
        }, 5000);
      }
    }) */
  }

  return (
    <ImageBackground
      source={require("../assets/iot_back.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.21)' }}>
        <View style={styles.container}>
          <Card style={styles.mainCard}>
            <Card.Title
              title="Bitki Durumu"
              subtitle="Canlı Veriler"
              left={(props) => <IconButton {...props} icon="flower" />}
            />
            <Card.Content>
              <View style={styles.dataRow}>
                <View style={styles.dataItem}>
                  <IconButton icon="thermometer" size={30} iconColor={MD3Colors.primary50} />
                  <Text variant="titleMedium">{plantData.temperature}°C</Text>
                  <Text variant="bodySmall">Sıcaklık</Text>
                </View>
                <View style={styles.dataItem}>
                  <IconButton icon="water-percent" size={30} iconColor={MD3Colors.primary50} />
                  <Text variant="titleMedium">%{plantData.humidity}</Text>
                  <Text variant="bodySmall">Nem</Text>
                </View>
              </View>

              <Card style={styles.soilCard}>
                <Card.Content>
                  <Text variant="titleMedium">Toprak Nemi</Text>
                  <ProgressBar
                    progress={plantData.soilMoisture / 100}
                    color={MD3Colors.primary50}
                    style={styles.progressBar}
                  />
                  <Text variant="bodyMedium">%{plantData.soilMoisture}</Text>
                </Card.Content>
              </Card>

              <Card style={styles.lightCard}>
                <Card.Content>
                  <Text variant="titleMedium">Işık Seviyesi</Text>
                  <ProgressBar
                    progress={plantData.lightLevel / 100}
                    color={MD3Colors.tertiary50}
                    style={styles.progressBar}
                  />
                  <Text variant="bodyMedium">%{plantData.lightLevel}</Text>
                </Card.Content>
              </Card>
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            onPress={handleWatering}
            loading={isWatering}
            disabled={isWatering}
            icon="watering-can"
            style={styles.waterButton}
          >
            {isWatering ? 'Sulama Yapılıyor...' : 'Sulama Başlat'}
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  mainCard: {
    marginBottom: 16,
    marginTop:40,
    elevation: 4,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  dataItem: {
    alignItems: 'center',
  },
  soilCard: {
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
  },
  lightCard: {
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  waterButton: {
    marginTop: 8,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})