import Adapter from "../../lib/adapter.js";
import GleeMessage from "../../lib/message.js";
import http from "http";
import { validateData } from "../../lib/util.js";
import GleeError from "../../errors/glee-error.js";
import * as url from "url";

class HttpAdapter extends Adapter {
  private res = new Map();

  name(): string {
    return "HTTP server";
  }

  async connect(): Promise<this> {
    return this._connect();
  }

  async send(message: GleeMessage): Promise<void> {
    return this._send(message);
  }

  _connect(): Promise<this> {
    return new Promise(async (resolve, reject) => {
      const config = await this.resolveProtocolConfig("http");
      const httpOptions = config?.server;
      const serverUrl = new URL(this.serverUrlExpanded);
      const httpServer = httpOptions?.httpServer || http.createServer();
      const asyncapiServerPort = serverUrl.port || 80;
      const optionsPort = httpOptions?.port;
      const port = optionsPort || asyncapiServerPort;

      httpServer.on("request", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        const bodyBuffer = [];
        let body: object;
        req.on("data", (chunk) => {
          bodyBuffer.push(chunk);
        });
        req.on("end", () => {
          body = JSON.parse(Buffer.concat(bodyBuffer).toString());

          this.res.set(this.serverName, res);
          let { pathname } = new URL(req.url, serverUrl);
          pathname = pathname.startsWith("/")
            ? pathname.substring(1)
            : pathname;
          if (!this.parsedAsyncAPI.channel(pathname)) {
            res.end("HTTP/1.1 404 Not Found1\r\n\r\n");
            const err = new Error(
              `A client attempted to connect to channel ${pathname} but this channel is not defined in your AsyncAPI file. here`
            );
            this.emit("error", err);
            return reject(err);
          }
          const { query: query } = url.parse(req.url, true);
          const searchParams = {
            query,
            body,
          };
          const httpChannelBinding = this.parsedAsyncAPI
            .channel(pathname)
            .binding("http");
          if (httpChannelBinding) {
            const { query, body, method } = httpChannelBinding;
            if (method && req.method !== method) {
              const err = new Error(`Cannot ${req.method} ${pathname}`)
              this.emit("error", err );
              res.end(err.message);
              return;
            }
            if (query) {
              const { isValid, humanReadableError, errors } = validateData(
                searchParams.query,
                query
              );
              if (!isValid) {
                const err = new GleeError({ humanReadableError, errors });
                this.emit("error", err);
                res.end(JSON.stringify(err.errors));
                return;
              }
            }
            if (body) {
              const { isValid, humanReadableError, errors } = validateData(
                searchParams.body,
                body
              );
              if (!isValid) {
                const err = new GleeError({ humanReadableError, errors });
                this.emit("error", err);
                res.end(JSON.stringify(err.errors));

                return;
              }
            }
          }
          this.emit("connect", {
            name: this.name(),
            adapter: this,
            connection: http,
            channel: pathname,
          });
          const msg = this._createMessage(pathname, searchParams);
          this.emit("message", msg, http);
        });
      });

      httpServer.listen(port);
      this.emit("server:ready", { name: this.name(), adapter: this });

      resolve(this);
    });
  }

  async _send(message: GleeMessage): Promise<void> {
    const connection = this.res.get(message.serverName);
    connection.write(message.payload);
    connection.end();
  }

  _createMessage(pathName: string, payload: any) {
    return new GleeMessage({
      payload: JSON.parse(JSON.stringify(payload)),
      channel: pathName,
    });
  }
}

export default HttpAdapter;
