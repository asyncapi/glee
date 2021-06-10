# TODO: Review and include this documentation in the main README

# glee-mqtt

MQTT adapter for [GleeJS](https://github.com/fmvilas/glee).

## Installing

```
npm install glee-mqtt
```

## Example

```js
const Glee = require('glee');
const MqttAdapter = require('glee-mqtt');

const app = new Glee();

app.addAdapter(MqttAdapter, {
  url: 'mqtt://test.mosquitto.org',
  channels: ['hola/+', 'adios/+'],
});
```

See a working example [here](./example/index.js).

## Author

Fran Méndez ([fmvilas.com](https://fmvilas.com))
