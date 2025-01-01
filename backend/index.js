const express = require('express');
const mqtt = require('mqtt');
const AWS = require('aws-sdk');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());


const s3 = new AWS.S3({
  accessKeyId:  'your_access_key',
  secretAccessKey: 'your_secret_key',
  region: 'eu-central-1'
});

const mqttHost = process.env.MQTT_HOST || 'broker.hivemq.com';
const mqttPort = process.env.MQTT_PORT || 1883;
const mqttTopic = 'camera/image';

const mqttOptions = {
  clientId: `mqtt_client_${Math.random().toString(16).slice(3)}`,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
};

const client = mqtt.connect(`mqtt://${mqttHost}:${mqttPort}`, mqttOptions);

app.get('/api/latest-image', async (req, res) => {
  try {
    console.log('Bucket Name:', process.env.AWS_BUCKET_NAME);
    
    const params = {
      Bucket: 'raspbibucket',
      Key: 'uploaded_image.jpg'
    };

    console.log('S3 parametreleri:', params);

    const data = await s3.getObject(params).promise();
    console.log('S3 veri alındı:', data);

    const imageBase64 = data.Body.toString('base64');
    res.json({ image: `data:image/jpeg;base64,${imageBase64}` });
  } catch (error) {
    console.error('S3 hatası detayı:', {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      requestId: error.requestId
    });
    res.status(500).json({ 
      error: 'Resim alınamadı',
      details: error.message 
    });
  }
});

app.post('/api/door-control', (req, res) => {
  const { action } = req.body;
  
  try {
    client.publish('door/control', action, (err) => {
      if (err) {
        console.error('MQTT mesajı gönderilemedi:', err);
        res.status(500).json({ error: 'Kapı kontrol edilemedi' });
      } else {
        res.json({ success: true, message: `Kapı ${action} komutu gönderildi` });
      }
    });
  } catch (error) {
    console.error('Kapı kontrol hatası:', error);
    res.status(500).json({ error: 'Kapı kontrol edilemedi' });
  }
});

client.on('connect', () => {
  console.log('MQTT Broker\'a başarıyla bağlandı');
  client.subscribe(mqttTopic, (err) => {
    if (!err) {
      console.log('camera/image topic\'ine abone olundu');
    }
  });
});

client.on('error', (error) => {
  console.error('MQTT bağlantı hatası:', error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});