import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://test.mosquitto.org')
client.publish('user/signedup', '{"displayName": "Fran Mendez", "email": "fmvilas@gmail.com"}', {
  qos: 2,
}, (err) => {
  if (err) console.error(err)
  console.log('Done!')
})