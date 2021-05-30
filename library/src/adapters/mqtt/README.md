# TODO: Review and include this documentation in the main README

# evolve-mqtt

MQTT adapter for [EvolveJS](https://github.com/fmvilas/evolve).

## Installing

```
npm install evolve-mqtt
```

## Example

```js
const Evolve = require('evolve');
const MqttAdapter = require('evolve-mqtt');

const app = new Evolve();

app.addAdapter(MqttAdapter, {
  url: 'mqtt://test.mosquitto.org',
  channels: ['hola/+', 'adios/+'],
});
```

See a working example [here](./example/index.js).

## Author

Fran Méndez ([fmvilas.com](https://fmvilas.com))
