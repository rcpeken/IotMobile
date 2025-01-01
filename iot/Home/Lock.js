import { StyleSheet, View, Image, Alert, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Surface, Text, Card, IconButton, MD3Colors } from 'react-native-paper'
import axios from 'axios'

const API_URL = 'http://192.168.53.131:3000'; 

export default function Lock() {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [cameraImage, setCameraImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLatestImage = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/api/latest-image`);
      if (response.data.image) {
        setCameraImage(response.data.image);
      }
    } catch (error) {
      console.error('Resim alma hatası:', error.response?.data || error.message);
      Alert.alert('Hata', `Kamera görüntüsü alınamadı: ${error.response?.data?.details || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestImage();

   const imageInterval = setInterval(fetchLatestImage, 10000);

    return () => {
      clearInterval(imageInterval);
    };
  }, []);

  const DoorControl = async () => {
    const action = isDoorOpen ? 'close' : 'open';
    try {
      await axios.post(`${API_URL}/api/door-control`, { action });
      setIsDoorOpen(!isDoorOpen);
      Alert.alert('Başarılı', `Kapı ${action === 'open' ? 'açıldı' : 'kapandı'}.`);
    } catch (error) {
      console.error('Kapı kontrol hatası:', error.response?.data || error.message);
      Alert.alert('Hata', 'Kapı kontrol edilemedi');
    }
  };

  return (
    <ImageBackground
      source={require("../assets/iot_back.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.21)' }}>
        <View style={styles.container}>
          <Card style={styles.cameraCard}>
            <Card.Title 
              title="Kapı Kamerası" 
              left={(props) => <IconButton {...props} icon="camera" />}
            />
            <Card.Content>
              {isLoading ? (
                <Surface style={styles.loadingContainer}>
                  <Text variant="bodyLarge">Kamera Görüntüsü Yükleniyor...</Text>
                </Surface>
              ) : cameraImage ? (
                <Image 
                  source={{ uri: cameraImage }} 
                  style={styles.cameraImage} 
                  resizeMode="cover"
                />
              ) : (
                <Surface style={styles.loadingContainer}>
                  <Text variant="bodyLarge">Görüntü Bulunamadı</Text>
                </Surface>
              )}
            </Card.Content>
          </Card>

          <Card style={styles.controlCard}>
            <Card.Title 
              title="Kapı Kontrolü" 
              left={(props) => <IconButton {...props} icon="lock" />}
            />
            <Card.Content>
              <View style={styles.statusContainer}>
                <Text variant="titleMedium" style={styles.statusText}>
                  Durum: {isDoorOpen ? 'Açık' : 'Kapalı'}
                </Text>
                <IconButton
                  icon={isDoorOpen ? 'lock-open' : 'lock'}
                  size={30}
                  iconColor={isDoorOpen ? MD3Colors.error50 : MD3Colors.primary50}
                />
              </View>
              <Button
                mode="contained"
                onPress={DoorControl}
                icon={isDoorOpen ? "lock" : "lock-open"}
                style={styles.controlButton}
              >
                {isDoorOpen ? 'Kapıyı Kapat' : 'Kapıyı Aç'}
              </Button>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  cameraCard: {
    marginBottom: 20,
    marginTop: 35,
    elevation: 4,
  },
  cameraImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
  loadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  controlCard: {
    elevation: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusText: {
    flex: 1,
  },
  controlButton: {
    marginTop: 8,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})