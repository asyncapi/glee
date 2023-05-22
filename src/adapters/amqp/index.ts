import amqplib, { cl } from "amqplib";
import Adapter from "../../lib/adapter.js";
import { AMQPAdapterConfig, AMQPAuthConfig } from "../../lib/index.js";
import { queue } from "async";

interface ClientData {
  auth?: AMQPAuthConfig;
  url?: URL;
  serverBindings?: any;
  protocolVersion?: number;
}

  const bindingTemplate: any = {
    vhost: '/',
    exchange: 'testExchange',
    queue: 'testQueue',
    queueOptions: {},
    exchangeOptions: {},
    heartbeat: 0
  };

class AMQPAdapter extends Adapter {
  private client: amqplib;
  name(): string {
    return "AMQP adapter";
  }
  async connect(): Promise<any> {
    return this._connect();
  }

  private async initializeConnection(data: ClientData) {
    const { url, auth, serverBindings, protocolVersion } = data;

    return amqplib.connect({
      host: url.hostname,
      port: url.port || 5672,
      protocol: url.protocol.slice(0, url.protocol.length - 1),
      username: auth.username,
      password: auth.password,
      keepalive: serverBindings?.keepAlive,
      vhost: serverBindings?.vhost,
      exchange: serverBindings?.exchange,
      heartbeat: serverBindings?.heartbeat,
      queue: serverBindings?.queue,
      protocolVersion,
    } as any);
  }

  _connect() {
    return new Promise<any>(async (resolve, reject) => {
        let resolved = false;
      const amqpOptions: AMQPAdapterConfig = await this.resolveProtocolConfig(
        "amqp"
      );
      const auth: AMQPAuthConfig = await this.getAuthConfig(amqpOptions.auth);
      const url = new URL(this.AsyncAPIServer.url());

      const protocolVersion = parseInt(
        this.AsyncAPIServer.protocolVersion() || "0.9.1"
      );
        const serverBindings = bindingTemplate;
    //   const serverBindings = this.AsyncAPIServer.binding("amqp");

      this.client = this.initializeConnection({
        url,
        auth,
        serverBindings,
        protocolVersion,
      });

      const catchError = error => {
        if(!resolved) return reject(error);
        this.emit('error', error)
      }

      this.client.then((conn) => {
        conn.createChannel().then((ch) => {
            let ok = ch.assertExchange(
              serverBindings?.exchange,
              "topic",
              serverBindings?.exchangeOptions
            );
            console.log(ok)
        }).catch((err) => catchError(err))
    //    conn.createChannel((err, ch) => {
    //     console.log(ch)
    //     if(err) catchError(err);
    //     let ok = ch.assertExchange(serverBindings?.exchange, 'topic', serverBindings?.exchangeOptions);
    //     ok.then((ch) => {
    //         console.log(ch)
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    //     // ch.assertQueue(serverBindings?.queue, {}, (err, _ok) => {
    //     //     if(err) catchError(err);
    //     //     cons
    //     // })
    //    })
      }).catch((err) => catchError(err))

    });
  }
}

export default AMQPAdapter;
