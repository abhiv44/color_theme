import express from "express";
import path from 'path'
import bodyParser from "body-parser";
import userRoutes from './routes/routes';
import cluster from "cluster";
import { cpus } from 'os'
import http from 'http'

const numCPUs = cpus().length;

class AppServer {
  app: any
  constructor() {
    this.app = express();
    
  }

  run(connection) {
    if (cluster.isMaster) {
      console.log(`Primary ${process.pid} is running`);

      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork()
      });

    } else {
      global.con = connection
      this.app.use(bodyParser.urlencoded({ extended: false }))
      const server = http.createServer(this.app)
      // parse application/json
      this.app.use(bodyParser.json())
      this.app.set("port", process.env.PORT || 3000);
      this.app.use(express.static('dist'));
      this.app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../../dist/index.html'));
      })
      this.app.use(userRoutes)

       
      server.listen(this.app.get("port"), () =>
        console.log('info', `Server running on PORT ${this.app.get("port")}`)
      );
  
      console.log(`Worker ${process.pid} started`);
    }

  }
}

export default AppServer