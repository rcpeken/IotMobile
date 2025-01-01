import { StyleSheet, View, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card, Text, IconButton, MD3Colors, Button } from 'react-native-paper'
// import mqtt from 'mqtt'

export default function Air() {
  const [gasData, setGasData] = useState({
    gasLevel: 450,  
    isGasLeak: false,
    lastUpdate: new Date(),
  });

  //const color = rgb(219, 159, 20)

  const getGasStatus = (level) => {
    if (level < 200) return { status: 'Normal', color: MD3Colors.primary40 };
    if (level < 400) return { status: 'Dikkat', color: '#FFD700' };
    return { status: 'TEHLİKE!', color: MD3Colors.error50 };
  };

  const currentStatus = getGasStatus(gasData.gasLevel);

  /* MQTT Bağlantısı - Daha sonra kullanılacak
  useEffect(() => {
    const client = mqtt.connect('ws://<raspberry-pi-ip>:1883')

    client.on('connect', () => {
      console.log('MQTT bağlantısı başarılı')
      client.subscribe('gas/level', (err) => {
        if (err) console.log('Gaz seviyesi verisine abone olunamadı.', err)
      })
    })

    client.on('message', (topic, message) => {
      if (topic === 'gas/level') {
        const level = parseFloat(message.toString());
        setGasData(prev => ({
          gasLevel: level,
          isGasLeak: level > 400,
          lastUpdate: new Date()
        }));
      }
    })

    client.on('error', (err) => console.error('MQTT Hatası:', err))

    return () => {
      if (client) client.end()
    }
  }, [])
  */

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
              title="Hava Kalitesi Kontrolü"
              subtitle="Gaz Sensörü Verileri"
              left={(props) => (
                <IconButton
                  {...props}
                  icon="air-filter"
                  size={30}
                  iconColor={currentStatus.color}
                />
              )}
            />
            <Card.Content>
              <View style={styles.statusContainer}>
                <View style={[styles.statusIndicator, { backgroundColor: currentStatus.color }]}>
                  <Text style={styles.statusText}>{currentStatus.status}</Text>
                </View>
              </View>

              <View style={styles.dataContainer}>
                <View style={styles.dataItem}>
                  <Text variant="titleLarge" style={{ color: currentStatus.color }}>
                    {gasData.gasLevel} PPM
                  </Text>
                  <Text variant="bodyMedium">Gaz Seviyesi</Text>
                </View>

                <View style={styles.dataItem}>
                  <Text variant="titleSmall">
                    Son Güncelleme:
                  </Text>
                  <Text variant="bodySmall">
                    {gasData.lastUpdate.toLocaleTimeString()}
                  </Text>
                </View>
              </View>

              {currentStatus.status === 'TEHLİKE!' && (
                <Card style={styles.warningCard}>
                  <Card.Content>
                    <Text variant="titleMedium" style={styles.warningText}>
                      ⚠️ GAZ KAÇAĞI TESPİT EDİLDİ!
                    </Text>
                    <Text variant="bodyMedium" style={styles.warningDetails}>
                      • Pencere ve kapıları açın{'\n'}
                      • Elektrikli cihazları kullanmayın{'\n'}
                      • Binayı tahliye edin{'\n'}
                      • Acil durum servislerini arayın
                    </Text>
                  </Card.Content>
                </Card>
              )}
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            icon="refresh"
            style={styles.refreshButton}
            onPress={() => {
-              setGasData({
                ...gasData,
                lastUpdate: new Date()
              });
            }}
          >
            Verileri Yenile
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
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mainCard: {
    marginTop: 40,
    elevation: 4,
  },
  statusContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  statusIndicator: {
    padding: 15,
    borderRadius: 25,
    minWidth: 150,
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  dataItem: {
    alignItems: 'center',
  },
  warningCard: {
    backgroundColor: '#ffebee',
    marginTop: 20,
  },
  warningText: {
    color: MD3Colors.error50,
    textAlign: 'center',
    marginBottom: 10,
  },
  warningDetails: {
    color: MD3Colors.error40,
    lineHeight: 24,
  },
  refreshButton: {
    marginTop: 20,
  },
})