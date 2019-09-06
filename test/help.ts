import * as http from 'http';
import * as setup from 'proxy';
import * as getPort from 'get-port'

class Proxy {
  host: string = '0.0.0.0'
  port: number
  server: http.Server
  isRunning: boolean = false

  async start() {
    if (this.isRunning) throw new Error('Proxy is running.')
    this.isRunning = true

    this.port = await getPort();
    return new Promise((resolve, reject) => {
      this.server = setup(http.createServer(), {});
      this.server.listen(this.port, this.host, resolve);
    })
  }

  stop() {
    this.server.close();
    this.isRunning = false;
  }
}

export function createProxy() {
  return new Proxy();
}